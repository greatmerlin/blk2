import Head from "next/head";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.css";
import Web3 from 'web3'
import aliensContract from '../blockchain/aliens.js'
import { useState, useEffect } from 'react'

export default function Home() {

  const [web3, setWeb3] = useState()
  const [address, setAdress] = useState()
  const [aliensName, setAliensName] = useState("")
  const [alContract, setalContract] = useState()
  const [balancebag, setBalancebag] = useState()

  useEffect(() => {
    if(alContract) getBag()
  }, [alContract, balancebag]);

  const getBag = async () => {
    const bag = await alContract.methods.getBalance().call()
    setBalancebag(bag)
  }

  const updateAliensName = (event) => {
    setAliensName(event.target.value)
  };

  const connectWalletHandler = async () => {
    // check if metamask is installed
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      try {
        // request a wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts"})
        // create a web3 instance & set as a state
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        // get list of accounts
        const accounts = await web3.eth.getAccounts()
        // set acc 1 to our state variable (react state), create a state for addresses, 
        //set it to place 0, array of accounts, grab the first one
        setAdress(accounts[0])

        // create local contract copy
        const ac = aliensContract(web3)
        setalContract(ac)

      } catch(err) {
        console.log(err.message)
      }
    } else {
      // metamask is not installed
      console.log("please install metamask")
      alert("metamask is not installed")
    }
  }

  return (
    <div>
      <Head>
        <title>Alien name selection</title>
        <meta name="description" content="FFHS Aliens Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>FFHS Aliens</h1>
            </div>
            <div className="navbar-end">
              <button onClick={connectWalletHandler} className="button is-link">connect wallet</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p>Enter your aliens name and confirm it by sending 0.01 Ether.
                    <br/>
                    After that, you will know if it is the best aliens name of this round!
                  </p>
                  <br />
                  <div>
                    <div>
                      <label>Insert your Aliens name here: </label>
                      <input type="text" value={aliensName} onChange={updateAliensName} placeholder="Please enter your aliens name" />
                    </div>
                    <br/> 
                  </div>
                  <button className="button is-link is-large is-light mt-3">
                    play now
                  </button>
                </section>
                <section className="mt-6">
                  <p>
                    <b>Admin only: Find out who has the craziest aliens name! (pick one randomly) </b>
                  </p>
                  <button className="button is-primary is-large is-light mt-3">
                    Randomly pick an aliens name
                  </button>
                  <p>Test save aliens name using hooks: {aliensName}</p>
                </section>
              </div>
              <div className={`${styles.aliensinfo}column is-one-third`}>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Aliens History</h2>
                        <div className="history-entry">
                          <div>FFHS-Aliens #1 winner:</div>
                          <div>
                            <a
                              href="https://rinkeby.etherscan.io/address/0x414d4a586a04ddf97b5ff141b4a70ace89c8651d"
                              target={"_blank"}
                            >
                              0x414d4A586a04dDF97B5Ff141b4a70ACe89C8651d
                            </a>
                          </div>
                          <div>with the following crazy aliens name:</div>
                          <div>Zaqroin</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Players (1)</h2>
                        <div>
                          <a
                            href="https://rinkeby.etherscan.io/address/0x414d4a586a04ddf97b5ff141b4a70ace89c8651d"
                            target={"_blank"}
                          >
                            0x414d4A586a04dDF97B5Ff141b4a70ACe89C8651d
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Balance</h2>
                        <p>{balancebag}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2022 Block Explorer</p>
      </footer>
    </div>
  );
}
