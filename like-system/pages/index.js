import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import React from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'



export async function getServerSideProps(){
  try{
    const responce = await axios.post('https://easscan.org/graphql', {
      query: "query Query($where: AttestationWhereInput){attestations(where: $where){id\nrecipient\nschemaId\nattester}}",
      variables: `{"where": {"schemaId": {"equals": "0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd"}}}`
    })

    const r = await responce.data;
    const newArr = Object.values(r);
    console.log(newArr);
    const newDataArray = newArr[0];
    const newDataArray2 = Object.values(newDataArray);
    const newDataArray3 = newDataArray2[0];
    console.log(newDataArray3[0].schemaId);

    return {
      props: { newDataArray3 }
    }  
  } catch (error) {
    console.error(error);
    return {
      props: {
        newDataArray3: []
      }
    }
  }
};
  

  



export default function Home({newDataArray3}) {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as='h2' size='2xl'>
        いいね一覧
      </Heading>
        
      <Link href={`https://easscan.org/schema/view/${newDataArray3[0].schemaId}`}>
          Schema Link 
      </Link>  
        

        
        
        <Divider />
        
        <Stack spacing={3}>
          
          <Input variant='filled' placeholder='Type your wallet address' />
          <Input variant='filled' placeholder='Type the recipient wallet address' />
          
        </Stack>

        <IconButton
          colorScheme='teal'
          aria-label='Call Segun'
          size='lg'
          icon={<CheckIcon />}
        />

   
        <ul>
          <Card>
          <CardHeader>
            <Heading size='md'>ALL TX</Heading>
          </CardHeader>
            {newDataArray3.map((item) => (
              <li key={item.id}>
                
                  
                    <CardBody>
                      <Stack spacing='4'>
                        <Box>
                          <Text pt='2' fontSize='sm'>From {item.attester} &gt; To {item.recipient}</Text>
                        </Box>
                      </Stack>
                    </CardBody>
                  
                
              </li>
            ))}
          </Card>
        </ul>
        
          
    
      
    
          
  
    
  

     
          
        
    </>
  )
}

/*
        
   
        
*/