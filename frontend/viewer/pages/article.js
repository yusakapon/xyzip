import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import styles from '../styles/Home.module.css';

import TheHeader from '../components/TheHeader';

// スタイリング
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxWidth: '600px',
    height: '300px',
    transform: 'translate(-50%, -50%)',
    zIndex: 200,
  },
};

export default function article() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [chip, setChip] = useState(0);
  const [isConnectWallet, setConnectWallet] = useState(false);

  const handleChange = event => {
    setChip(event.target.value);
  };

  const reactionUnit = () => {
    if (isConnectWallet) {
      return (
        <div className={styles.modalInner}>
          <button className={styles.reactionBtn}>Send Reaction</button>
          <div className={styles.modalTip}>
            <p className={styles.modalChip}>
              <input type="number" value={chip} onChange={handleChange} /> MATIC
            </p>
            <button className={styles.donateBtn}>Give a tip</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.modalConectWallet}>
          <p className={styles.modalInnerMsg}>
            Please connect wallet
            <br />
            to deliver reactions to the author.
          </p>
          <button className={styles.connectWalletBtn} onClick={() => setConnectWallet(true)}>
            Connect Wallet
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TheHeader />

      <main className={styles.articleWrap}>
        <h1 className={styles.articleTitle}>Lorem Ipsum</h1>
        <div className={styles.articleSummary}>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className={styles.articleBody}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet purus ut nisi sollicitudin
            ullamcorper non vitae erat. Curabitur venenatis magna eget mollis tristique. Sed pretium enim nulla, a
            tristique nulla tristique ac. Nulla et nibh sed leo placerat mollis sed a augue. Integer id gravida purus,
            eu lobortis mi. Mauris imperdiet, dolor in placerat tincidunt, est risus mattis dolor, vel sodales dolor
            libero ac tortor. Cras pretium, tellus eget hendrerit semper, neque justo iaculis eros, eu efficitur augue
            quam a sapien. Nam elementum dolor at neque dignissim aliquet. Nam auctor eu massa ut iaculis. Duis est
            enim, condimentum id neque vel, imperdiet feugiat justo. Pellentesque consectetur non lectus quis lobortis.
            Quisque dignissim eu lorem ut fermentum.
          </p>
          <p>
            Vivamus ac gravida ipsum, in tincidunt nunc. Nulla venenatis egestas varius. Phasellus ullamcorper aliquet
            elit vel auctor. Vivamus vitae luctus est. Cras molestie vel quam vitae blandit. Aliquam metus felis,
            lacinia eget pellentesque a, molestie non nisl. Duis semper scelerisque mauris in efficitur. Etiam
            vestibulum sem ex, quis rhoncus mi lacinia nec. Nunc sollicitudin, dui a scelerisque luctus, leo enim
            efficitur odio, vel lobortis tortor odio ac metus. Etiam vehicula odio sed dui vehicula, sed porttitor mi
            luctus. Aenean nec lacus tempus, sagittis arcu vel, porttitor ligula.
          </p>
          <p>
            Suspendisse fringilla molestie lacus, ac volutpat tellus eleifend at. Sed viverra, ex a laoreet facilisis,
            mi lorem faucibus odio, ac pretium diam arcu eget felis. Donec accumsan sem ipsum, id volutpat sem varius
            eget. Fusce sit amet nisi sed purus convallis feugiat. Fusce posuere tempus euismod. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse varius orci et dapibus mollis.
            Proin ullamcorper tempus ex, eget egestas nisl varius quis. Morbi dignissim quis risus a aliquet. Phasellus
            condimentum ipsum at pulvinar venenatis. Ut dictum commodo placerat.
          </p>
        </div>

        <nav className={styles.reactionUnit}>
          <button className={styles.addReactionBtn} onClick={() => setIsOpen(true)}>
            Add Reaction
          </button>
        </nav>
      </main>

      <footer className={styles.footer}>Powered by xyzip</footer>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        {reactionUnit()}
        <div className={styles.modalFooter}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            Close x
          </button>
        </div>
      </Modal>
    </div>
  );
}
