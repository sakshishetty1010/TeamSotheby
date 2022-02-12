import React from 'react'
import {Button} from '../ButtonElements';

import { FirstContainer, TextWrapper, Topline, SubTitle, Img, BtnWrap, FirstWrapper, ImgWrap, FirstRow, Column1, Column2, Heading } from './FirstElements'

const First = ({
    lightBg,
    darkText,
    img,
    description,
    lightText,
    headline,
    topline,
    id,
    imgStart,
    buttonLabel,
    alt, 
    primary,
    dark,
    dark2 }) => {
    return (
        <>
            <FirstContainer lightBg={lightBg} id={id}>
                <FirstWrapper>
                    <FirstRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <Topline>{topline}</Topline>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <SubTitle darkText={darkText}>{description}</SubTitle>

                            </TextWrapper>
                            <BtnWrap>
                                <Button to="/explore"
                                // smooth={true}
                                duration={500}
                                // spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary ? 1:0}
                                dark={dark ? 1:0}
                                dark2={dark2 ? 1:0}
                                >{buttonLabel}</Button>
                            </BtnWrap>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt} />
                            </ImgWrap>
                        </Column2>
                    </FirstRow>
                </FirstWrapper>
            </FirstContainer>
        </>
    )
};

export default First