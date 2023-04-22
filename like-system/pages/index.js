import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import React from 'react';



export async function getServerSideProps() {
  try {
    const response = await axios.get('https://easscan.org/api/getAttestations?limit=10&page=2');
    const data = await response.data;
    const arr = Object.values(data);
    const dataArray = arr[0];

    return {
      props: {
        dataArray
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        dataArray: []
      }
    }
  }
}



export default function Home({ dataArray }) {

  console.log(dataArray);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      
        
          <ul>
            {dataArray.map((item) => (
              <li key={item.id}>{item.recipient}</li>
            ))}
          </ul>

          
          <h1>テスト</h1>
          
        
    </>
  )
}
