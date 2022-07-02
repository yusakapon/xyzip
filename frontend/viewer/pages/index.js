import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// import web3 from "../web3/web3";
import Web3 from 'web3';

import TheHeader from '../components/TheHeader';
import Card from '../components/Card';

export default function Home() {
  // const url = 'https://rpc-mumbai.maticvigil.com/';
  const url = 'https://rpc-mainnet.maticvigil.com';
  const web3 = new Web3(new Web3.providers.HttpProvider(url));
  const contractAddress = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
  const abi = ['function balanceOf(address) view returns (unit)'];

  /*
  const contract = new web3.eth.Contract([], contractAddress);

  contract.methods
    .totalSupply()
    .call()
    .then(result => {
      console.log(result);
    });
  */

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TheHeader />

      <main className={styles.cardWrap}>
        <Card title="What is Lorem Ipsum?">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Card>
        <Card title="Why do we use it?">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout.{' '}
        </Card>
        <Card title="Where does it come from?">Contrary to popular belief, Lorem Ipsum is not simply random text.</Card>
        <Card title="Where can I get some?">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look even slightly believable.
        </Card>
        <Card title="What is Lorem Ipsum?">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Card>
        <Card title="Why do we use it?">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout.{' '}
        </Card>
      </main>

      <footer className={styles.footer}>Powered by xyzip</footer>
    </div>
  );
}
