import { useState } from "react";
import { Card, ButtonGreen, CardDiv } from "../assets/styled";
import NFT_modal from "./NFT_modal";


const NFT_Card = ({ nft }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>{
            nft &&
            <Card>
                <CardDiv>
                    <img className="w-full rounded-xl" src={nft.image} alt={nft.name} />
                </CardDiv>
                <CardDiv>
                    <div className="font-bold text-xl mb-2">{nft.name}</div>
                    <p className="text-gray-700 text-base">
                        {nft.description}
                    </p>
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