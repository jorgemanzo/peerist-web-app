import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery } from 'urql'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import { getUserPapers } from '../queries'

const CreateButton = styled.a`
  appearance: none;
  border: 3px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  margin: 7px;
  :hover {
    background: black;
    color: white;
  }
  & svg {
    margin-right: 5px;
  }
`

const handlePapersQuery = (auth, queryResult, setPapers) => {
    // Check to see if our query tells us the user has any papers
    if(!queryResult.fetching && !queryResult.error && queryResult.data.Paper.length > 0) {
        console.log('Your papers:', queryResult.data.Paper)
        setPapers(queryResult.data.Paper)
        // Something horrible happened.
    } else {
        console.log('Something weird happened: ', queryResult)
    }

}

const Papers = () => {
    const auth = useAuth({})
    const [papers, setPapers] = useState([])

    const [userPapersResult] = useQuery({
        query: getUserPapers,
        variables: { email: auth.user.email }
    })

    useEffect(() => {
        handlePapersQuery(auth, userPapersResult, setPapers)
    }, [userPapersResult])
    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}]}/>

            <Container pt={3} justifyContent='flex-end'>
                <Link href='/app/papers/create' passHref>
                    <CreateButton>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Create Paper
                    </CreateButton>
                </Link>
            </Container>

            <Container pt={3}>
                <Divider />
            </Container>

        </div>
    )
}

export default withLoginRequired(withAuth(Papers))
