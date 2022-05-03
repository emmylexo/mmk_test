import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { Response } from 'superagent';
import 'mocha';
import app from '../index';
import { request } from 'chai';
import { delRedis } from '../app/utils/redis';

const expect = chai.expect;

const testData = {
    from: '2349198443435345',
    to: '4924195509198',
    text: 'STOP'
}

const username = `azr1`;
const password = `20S0KPNOIM`;
var agent = request.agent(app);


describe('Test SMS', () => {
    before(async () => {
        const key = testData.to + `_` + testData.from;
        await delRedis(key);
    });

    it('It should reject any method other than post with status 405', async () => {
        const res: Response = await agent.get('/v1/outbound/sms')
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(405);
        expect(res).to.be.a('object');
        expect(res.body).to.haveOwnProperty('message');
    });

    it('Return status 403 for failing authentication', async () => {
        const res: Response = await agent.post(`/v1/outbound/sms`).send(testData)
            .auth(`testUsername`, `testPassword`);
        expect(res).to.have.status(403);
        expect(res).to.be.a('object');
    })

    it('Check invalid data', async () => {
        const res: Response = await agent.post(`/v1/outbound/sms`).send({ from: '029', to: '0909283827', text: 'Testing invalid data' })
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body.message).to.be.eql('from is invalid')
    })

    it('Check if to is not present in phone numbers', async () => {
        const res: Response = await agent.post(`/v1/inbound/sms`).send({ from: '0901928372', to: '0909283827', text: 'Testing' })
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(404);
        expect(res).to.be.a('object');
        expect(res.body.message).to.be.eql('to parameter not found')
    });

    it('Send a stop request', async () => {
        const res: Response = await agent.post(`/v1/inbound/sms`).send(testData)
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.message).to.be.eql('inbound sms ok')
    });

    it('Check if from is not present in phone numbers', async () => {
        const res: Response = await agent.post(`/v1/outbound/sms`).send({ from: '090192822372', to: '0909283827', text: 'Testing' })
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(404);
        expect(res).to.be.a('object');
        expect(res.body.message).to.be.eql('from parameter not found')
    });

    it('Check if pair matches', async () => {
        const res: Response = await agent.post(`/v1/outbound/sms`).send(testData)
            .auth(`${username}`, `${password}`);
        expect(res).to.have.status(409);
        expect(res).to.be.a('object');
        expect(res.body.success).to.be.false
    });
})