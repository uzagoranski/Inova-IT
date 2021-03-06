// Sinon mock middleware
import sinon from "sinon";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Stats service & repository
const statsService = require( "../service/stats");
const statsRepository = require('../repository/stats');
const usersRepository = require('../repository/users');
const roundsRepository = require('../repository/rounds');

// StatsList test object
const statsList = [
    { 
        _id: "98sa1fo7621x1904ft30d4e0x",       
        UserID: '5db51fo951x1904ft30d493s',
        name: 'John Doe',
        competitionID: '5d4bf1fe27bc3d3b54079693',
        segmentID: '1481291',
        elapsedTime: 861,
        distance: 1037.4,
        __v: 0 
    },
    { 
        _id: "98sa1fo7621x1904ft30d4e2x",       
        UserID: '5db51fo951x1904ft30d493s',
        name: 'John Doe',
        competitionID: '5d4bf1fe27bc3d3b54079693',
        segmentID: '7102894',
        elapsedTime: 1595,
        distance: 1877.7,
        __v: 0 
    },
]

// UsersList test object
const usersList = [
    { 
        stravaUserID: '98502547',
        stravaAccessToken: 'omqhhq23rgk9ntbinj5yymq4u50e344e6g01702u',
        stravaRefreshToken: 'zyzmprl6m8f1ha8xtjal2xlozm77b0m0pszq45hd',
        accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
        _id: "5db51fo951x1904ft30d493s",
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password:
            '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0 
    },
    { 
        stravaUserID: '87492338',
        stravaAccessToken: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
        stravaRefreshToken: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
        accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
        _id: "5do91f51x19db504f493st30",
        name: 'Test User',
        email: 'test@gmail.com',
        password:
            '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0 
    }
]

describe('Stats service tests', () => {
    
    test("Test addStatsRound", async () => {

        sinon.stub(usersRepository, 'getStravaUsers')
            .returns(Promise.resolve(usersList));

        let mock = new MockAdapter(axios);

        let mockResponse = { 
            _id: "98sa1fo7621x1904ft30d4e2x",       
            UserID: '5db51fo951x1904ft30d493s',
            name: 'John Doe',
            competitionID: '5d4bf1fe27bc3d3b54079693',
            segmentID: '7102894',
            elapsedTime: 1595,
            distance: 1877.7,
            __v: 0 
        }

        mock.onPut('http://localhost:5000/api/strava/refreshToken').reply(200, 'ok');

        mock.onGet('https://www.strava.com/api/v3/segments/7102894/all_efforts?per_page=30').reply(200, mockResponse);

        sinon.stub(statsRepository, 'addStats')
            .returns(Promise.resolve(mockResponse));

        expect(await statsService.addStatsRound('5d4bf1fe27bc3d3b54079693', '7102894')).toEqual(
            { 
                _id: "98sa1fo7621x1904ft30d4e2x",       
                UserID: '5db51fo951x1904ft30d493s',
                name: 'John Doe',
                competitionID: '5d4bf1fe27bc3d3b54079693',
                segmentID: '7102894',
                elapsedTime: 1595,
                distance: 1877.7,
                __v: 0 
            }
        );

    });

   /*  test("Test addStatsUser", async () => {

        sinon.stub(usersRepository, 'getUserByID')
            .returns(Promise.resolve(usersList[0]));

        sinon.stub(roundsRepository, 'getSegmentIDs')
            .returns(Promise.resolve(statsList));

        let mock = new MockAdapter(axios);

        let mockResponse = { 
            _id: "98sa1fo7621x1904ft30d4e2x",       
            UserID: '5db51fo951x1904ft30d493s',
            name: 'John Doe',
            competitionID: '5d4bf1fe27bc3d3b54079693',
            segmentID: '7102894',
            elapsedTime: 1595,
            distance: 1877.7,
            __v: 0 
        }

        mock.onPut('http://localhost:5000/api/strava/refreshToken').reply(200, 'ok');

        mock.onGet('https://www.strava.com/api/v3/segments/7102894/all_efforts?per_page=30').reply(200, mockResponse);

        expect(await statsService.addStatsUser('5db51fo951x1904ft30d493s')).toEqual(
            { 
                _id: "98sa1fo7621x1904ft30d4e2x",       
                UserID: '5db51fo951x1904ft30d493s',
                name: 'John Doe',
                competitionID: '5d4bf1fe27bc3d3b54079693',
                segmentID: '7102894',
                elapsedTime: 1595,
                distance: 1877.7,
                __v: 0 
            }
        );

    }); */

});