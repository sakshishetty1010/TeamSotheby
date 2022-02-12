import React from 'react'
import Icon1 from '../images/services.svg'
import Icon2 from '../images/music2.svg'
import Icon3 from '../images/upload.svg'

import { ServiceIcon,ServicesContainer, ServicesWrapper,ServicesH1,ServicesH2,ServicesP,ServiceCard } from './ServicesElements'
const Services = () => {
  return (
    <>
    <ServicesContainer id="services">
        <ServicesH1>Our Services </ServicesH1>
        <ServicesWrapper>
            <ServiceCard>
                <ServiceIcon src={Icon1} />
                <ServicesH2>Tip Artists Easily</ServicesH2>
                <ServicesP>You can directly tip the artist without any middleman</ServicesP>
            </ServiceCard>
            <ServiceCard>
                <ServiceIcon src={Icon2} />
                <ServicesH2>Listen to your fav Artist</ServicesH2>
                <ServicesP>Listen to your fav artist</ServicesP>
            </ServiceCard>
            <ServiceCard>
                <ServiceIcon src={Icon3} />
                <ServicesH2>Upload your music</ServicesH2>
                <ServicesP>Upload your music on the platform as an artist</ServicesP>
            </ServiceCard>
        </ServicesWrapper>
    </ServicesContainer>
    </>
  )
}

export default Services