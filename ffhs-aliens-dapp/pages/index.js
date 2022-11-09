import Head from "next/head";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.css";
import Web3 from "web3";
import aliensContract from "../blockchain/aliens.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import alien1 from "../Images/alien1.png";
import alien2 from "../Images/alien2.png";
import alien3 from "../Images/alien3.png";
import alien4 from "../Images/alien4.png";
import alien5 from "../Images/alien5.png";
import alien6 from "../Images/alien6.png";
import alien7 from "../Images/alien7.png";
import alien8 from "../Images/alien8.png";
import alien9 from "../Images/alien9.png";

export default function Home() {
  const [web3, setWeb3] = useState();
  const [address, setAdress] = useState();
  const [aliensName, setAliensName] = useState("");
  const [alContract, setalContract] = useState();
  const [balancebag, setBalancebag] = useState();
  const [players, setPlayers] = useState([]);
  const [flagName, setFlagName] = useState(false);
  const [aliensFace, setAliensface] = useState();
  const [connected, setConnected] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (alContract) getBag();
    if (alContract) getPlayers();
  }, [alContract]);

  const getBag = async () => {
    const bag = await alContract.methods.getBalance().call();
    setBalancebag(web3.utils.fromWei(bag));
  };

  const getPlayers = async () => {
    const gamePlayers = await alContract.methods.getPlayers().call();
    setPlayers(gamePlayers);
  };

  const handlePlayButton = async () => {
    try {
      await alContract.methods.enter().send({
        from: address,
        value: "15000000000000000",
        gas: 300000,
        gasPrice: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  async function isConnected() {
     const accounts = await ethereum.request({method: 'eth_accounts'});       
     if (accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`);
        setConnected(true);
     } else {
        setNotification(true);
     }
  }

  const handleRandomNameButton = async () => {
    isConnected()
    if(connected)
    {
      try {
        const randomNum = await alContract.methods.getRandomNumber().call();
        const num = randomNum % 9;
  
        const randomNameGenerator = (num) => {
          let res = "";
          for (let i = 0; i < num; i++) {
            const random = Math.floor(Math.random() * 27);
            res += String.fromCharCode(97 + random);
          }
          return res;
        };
  
        const adjectives = [
          "blue",
          "smiley",
          "funny",
          "smelly",
          "short",
          "crazy",
          "suspicious",
          "serious",
          "bored",
        ];
        const randomElement = Math.floor(Math.random() * adjectives.length);
        const aliensArrayTwo = [
          "ulgi",
          "correllia",
          "thorby",
          "holden",
          "azan",
          "liara",
          "vorian",
          "allana",
          "corran",
        ];
        // aliens Name
        const finalName =
          adjectives[randomElement] +
          " " +
          randomNameGenerator(num) +
          aliensArrayTwo[randomElement];
  
        const aliensArray = [
          alien1,
          alien2,
          alien3,
          alien4,
          alien5,
          alien6,
          alien7,
          alien8,
          alien9,
        ];
        const finalAliensFace = aliensArray[randomElement];
  
        setAliensName(finalName);
        setAliensface(finalAliensFace);
        setFlagName(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("is handled with isConnected method")
    }


  };

  const connectWalletHandler = async () => {
    // check if metamask is installed
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // request a wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // create a web3 instance & set as a state
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        // get list of accounts
        const accounts = await web3.eth.getAccounts();
        // set acc 1 to our state variable (react state), create a state for addresses,
        //set it to place 0, array of accounts, grab the first one
        setAdress(accounts[0]);

        // create local contract copy
        const ac = aliensContract(web3);
        setalContract(ac);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // metamask is not installed
      console.log("please install metamask");
      alert("metamask is not installed");
    }
  };

  const closeNot = () => {
    setNotification(false)
  }

  return (
    <div>
      <Head>
        <title>FFHS Alien name generator</title>
        <meta name="description" content="FFHS Aliens Dapp" />
      </Head>
      <main className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1 className="title is-1-desktop">FFHS aliens name generator</h1>
            </div>
            <div className="navbar-end">
              <button onClick={connectWalletHandler} className="button is-danger">
                connect wallet
              </button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-6">
                  <p>
                    <b>Use our Smart-Contract to generate an awesome random Alien's name!</b>
                  </p>
                  <button
                    className="button is-primary is-large is-light mt-3"
                    onClick={handleRandomNameButton}
                  >
                    Randomly pick an aliens name
                  </button>
                </section>
                <section>
                  <br />
                  {notification ? (
                    <div className="notification is-danger">
                    <button onClick={closeNot} className="delete mt-3"></button>
                     <strong>please log in your metamask account using the 'connect wallet' button to procceed</strong>
                  </div>
                  ) :  <p></p>}
                </section>
                <section>
                  <div className="container has-text-info mt-6">
                    {flagName ? (
                      <div>
                        <b>WoW! You are the notorious "{aliensName}" !!</b>
                        <div>
                          <Image
                            src={aliensFace}
                            alt="no aliens image for you!"
                          />
                        </div>
                      </div>
                    ) : (
                      <p>Your alien's name and image will appear here...</p>
                    )}
                  </div>
                </section>
                <div>
                  <section className="mt-5">
                  <br />
                      Support us with an ETH donation (minimum 0.01 Ether excl.Gas).
                    <br />
                    <button
                      className="button is-danger is-large is-light mt-3"
                      onClick={handlePlayButton}
                    >
                      donate now
                    </button>
                  </section>
                </div>
              </div>
              <div className={`${styles.aliensinfo}column is-one-third`}>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Generator used by ({players.length})</h2>
                        <ul className="ml-0">
                          {players &&
                            players.length > 0 &&
                            players.map((player, index) => {
                              return (
                                <li key={`${player}-${index}`}>
                                  <a
                                    href={`https://etherscan.io/address/${player}`}
                                    target="_blank"
                                  >
                                    {player}
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Donated so far</h2>
                        <p>
                          {balancebag ? balancebag + " Ether" : 0 + " Ether"}
                        </p>
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
        <p>&copy; 2022 Theologos Baxevanos FFHS</p>
      </footer>
    </div>
  );
}
