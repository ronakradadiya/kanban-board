import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import KanbanBoardContainer from 'KanbanBoard'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Kanban Board POC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KanbanBoardContainer />
    </div>
  )
}

export default Home
