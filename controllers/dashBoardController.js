import axios from 'axios';
import 'dotenv/config';





console.log('yes i am runingg....')


export const upcomingDashBoard = async (req, res) => {
    try {



        console.log(`${process.env.URL}/v4/sports/basketball_nba/events?apiKey=${process.env.apiKey}`);

        const response = await axios.get(`${process.env.URL}/v4/sports/basketball_nba/events?apiKey=${process.env.apiKey}`);
        let upcomingEvent = response.data;
        console.log(upcomingEvent[1].home_team);
        console.log(upcomingEvent[1].home_team + 'It is calling');
        let srch = {};
        let srca = {};
        for (let i = 0; i < upcomingEvent.length; i++) {
            let teamName = upcomingEvent[i].home_team;
            srch[i] = `/resource/teamlogo/${teamName}.svg`;
        }

        for (let i = 0; i < upcomingEvent.length; i++) {
            let teamName = upcomingEvent[i].away_team;
            srca[i] = `/resource/teamlogo/${teamName}.svg`;
        }


        let sportKey = upcomingEvent[0].sport_key;
        let title = "";
        if (sportKey === 'basketball_nba') {
            title = 'Basketball';
        }
        console.log(sportKey, "It is call from storing variable");

        upcomingEvent = response.data.map(e => {
            let dateObj = new Date(e.commence_time);


            return {
                ...e,
                istDate: dateObj.toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'
                }),
                istTime: dateObj.toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true
                }),
            }
        })



        res.render('upcomingDashboard', { upcomingEvent: upcomingEvent, srch: srch, srca: srca, title: title });


    } catch (error) {

        //--> 
        console.error("from log", error);
        res.status(500).json({
            success: false,
            error: "Something went wrong !...."
        })
    }
}

export const completeDashBoard = async (req, res) => {
    console.log('----Complete Dashboard----');
    try {
        console.log(`${process.env.URL}/v4/sports/basketball_nba/scores/?daysFrom=1&apiKey=${process.env.apiKey}`)
        const response = await axios.get(`${process.env.URL}/v4/sports/basketball_nba/scores/?daysFrom=1&apiKey=${process.env.apiKey}`);
        const live = response.data;
        let sportKey = live[0].sport_key;
        let title = "";
        if (sportKey === 'basketball_nba') {
            title = 'Basketball';
        }


        console.log(live[1].home_team);
        console.log(live[1].home_team + 'It is calling');
        let srch = {};
        let srca = {};
        for (let i = 0; i < live.length; i++) {
            let teamName = live[i].home_team;
            srch[i] = `/resource/teamlogo/${teamName}.svg`;
        }

        for (let i = 0; i < live.length; i++) {
            let teamName = live[i].away_team;
            srca[i] = `/resource/teamlogo/${teamName}.svg`;
        }




        res.render('completeDashBoard', {
            completeDashBoard: live,
            srch: srch,
            srca: srca
        });


    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            error: "Something went wrong !...."
        })
    }
}


console.log('yes i am runingg....')


export const liveDashboard = async (req, res) => {
    try {


        console.log(`${process.env.URL}/v4/sports/basketball_nba/scores/?daysFrom=1&apiKey=${process.env.apiKey}`);

        const response = await axios.get(`${process.env.URL}/v4/sports/basketball_nba/scores/?daysFrom=1&apiKey=${process.env.apiKey}`);
        console.log("actual length: ", response.data.length);
        const now = Date.now();
        const fiftyMinsInMs = 5 * 60 * 1000;
        const fifteenMinsInMs = 5 * 60 * 1000;
        let liveEvent = response.data.filter(event => {
            if (!event.last_update) return false; // Skip if no update yet

            const updateTime = new Date(event.last_update).getTime();

            // Check if updateTime is within (Now - 50m) and (Now + 15m)
            return updateTime >= (now - fiftyMinsInMs) && updateTime <= (now + fifteenMinsInMs);
        });


        let srch = {};
        let srca = {};
        for (let i = 0; i < liveEvent.length; i++) {
            srch[i] = `/resource/teamlogo/${liveEvent[i].home_team}.svg`;
            srca[i] = `/resource/teamlogo/${liveEvent[i].away_team}.svg`;
        }

        // 4. DATE/TIME CONVERSION FOR RENDERING
        liveEvent = liveEvent.map(e => {
            let dateObj = new Date(e.commence_time);
            return {
                ...e,
                istDate: dateObj.toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'
                }),
                istTime: dateObj.toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true
                })
            };
        });

        const sportKey = liveEvent[0]?.sport_key;
        const title = (sportKey === 'basketball_nba') ? 'Basketball' : 'Live Sports';

        res.render('liveDashBoard', { liveEvent, srch, srca, title });

    } catch (error) {

        //--> 
        console.error(error);
        console.error("from log", error);
        res.status(500).json({
            success: false,
            error: "Something went wrong !...."
        })
    }
}

