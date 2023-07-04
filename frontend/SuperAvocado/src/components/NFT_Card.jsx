import { useState } from "react";
import { Card, ButtonGreen, CardDiv, Image, DescriptionP} from "../assets/styled";
import NFT_modal from "./NFT_modal";


const NFT_Card = ({ nft }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>{
            nft &&
            <Card>
                <CardDiv>
                    <Image src={nft.image} alt={nft.name} />
                </CardDiv>
                <CardDiv>
                    <div className="font-bold text-xl mb-2">{nft.name}</div>
                    <DescriptionP>
                        {nft.description}
                    </DescriptionP>
                </CardDiv>

                <CardDiv>
                    <ButtonGreen
                        onClick={() => setShowModal(true)}>
                        More Details
                    </ButtonGreen>
                </CardDiv>

            </Card>
        }
            <NFT_modal
                showModal={showModal}
                setShowModal={setShowModal}
                nft={nft}
            />
        </>

    )
}

export default NFT_Card