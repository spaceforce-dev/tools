var shell = require('shelljs');
let RewardDelegatingService = require('./services/contracts/reward-delegating-contract');

const contracts = {
    dotDelegatingContract: new RewardDelegatingService('0x716868909ab9a93a64a9c657e7139c383fd01031'),
    kusamaDelegatingContract: new RewardDelegatingService('0x059ab79dbcd5e3e976bc36ca934dc0d779b60881'),
};


let run = async () => {
    let historyDot = await contracts.dotDelegatingContract.contract.getPastEvents('AddLink', {
        fromBlock: 0,
    })
    let historyKusama = await contracts.kusamaDelegatingContract.contract.getPastEvents('AddLink', {
        fromBlock: 0,
    })

    let dataDot = {
        totalNominating: 0,
        totalNominators: 0,
        totalNominatingReal: 0,
    }
    
    let dataKusama = {
        totalNominating: 0,
        totalNominators: 0,
        totalNominatingReal: 0,
    }

    historyDot.forEach((event) => {

        console.log(event.returnValues.target)
        var stash = JSON.parse(shell.exec(`yarn run:api query.staking.ledger ${event.returnValues.target} --ws wss://rpc.polkadot.io/`, {silent:true}).stdout);
        var targets = JSON.parse(shell.exec(`yarn run:api query.staking.nominators ${event.returnValues.target} --ws wss://rpc.polkadot.io/`, {silent:true}).stdout);
        
        console.log(stash)
        console.log(targets)
        console.log(targets.nominators)

        if (stash) {
            try {
                let nominating = stash.ledger.active.split(' ')[0]

                let isTargetingMdao = targets.nominators.targets.includes('14B2ArWoQKrZy6mcHF6St6GKajTX1WzUAqpQhiVs7Bkq8n7W')

                console.log(isTargetingMdao)
                if (isTargetingMdao) {
                    dataDot.totalNominators++
                    dataDot.totalNominating = dataDot.totalNominating + Number(nominating) 
                    dataDot.totalNominatingReal = dataDot.totalNominatingReal + (Number(nominating) / targets.nominators.targets.length)
                }
                
            } catch (error) {
                console.log(error)
                console.log('noStash')
            }
            
        }

        console.log(`SYNC: Active nominators DOT: ${dataDot.totalNominators}`)
        console.log(`SYNC: Nominating total DOT: ${dataDot.totalNominating}`)

    })

    historyKusama.forEach((event) => {

        console.log(event.returnValues.target)
        var stash = JSON.parse(shell.exec(`yarn run:api query.staking.ledger ${event.returnValues.target} --ws wss://kusama-rpc.polkadot.io/`, {silent:true}).stdout);
        var targets = JSON.parse(shell.exec(`yarn run:api query.staking.nominators ${event.returnValues.target} --ws wss://kusama-rpc.polkadot.io/`, {silent:true}).stdout);
        
        console.log(stash)
        console.log(targets)
        console.log(targets.nominators)

        if (stash) {
            try {
                let nominating = stash.ledger.active.split(' ')[0]

                let isTargetingMdao = targets.nominators.targets.includes('HhZkxUEceUTr4FYNUAZECizfd5QLVKMdfZAL1eY3xPAPmwA')

                console.log(isTargetingMdao)
                if (isTargetingMdao) {
                    dataKusama.totalNominators++
                    dataKusama.totalNominating = dataKusama.totalNominating + Number(nominating) 
                    dataKusama.totalNominatingReal = dataKusama.totalNominatingReal + (Number(nominating) / targets.nominators.targets.length)
                }
                
            } catch (error) {
                console.log(error)
                console.log('noStash')
            }
            
        }

        console.log(`SYNC: Active nominators KSM: ${dataKusama.totalNominators}`)
        console.log(`SYNC: Nominating total KSM: ${dataKusama.totalNominating}`)

    })

    console.log(`
    
        ✨ FINISHED ✨

        Final:
            POLKADOT:  {
                {
                    active_nominators: ${dataDot.totalNominators}),
                    nominating_total: ${dataDot.totalNominating}),
                    nominating_total_real: ${dataDot.totalNominatingReal},
                }
            },
            KUSAMA:  {
                {
                    active_nominators: ${dataKusama.totalNominators}),
                    nominating_total: ${dataKusama.totalNominating}),
                    nominating_total_real: ${dataKusama.totalNominatingReal},
                }
            }
    
    `)
}
run()

