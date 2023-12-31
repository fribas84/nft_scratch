import {ButtonRed, 
        ModalDefault,
        ModalHeader,
        ModalTitle,
        ModalClose,
        ModalContent,
        ModalImageContainer,
        Image,
        ModalContentCointainer,
        ModalContentHeader,
        DescriptionP,
        ModalAtributesContainer,
        ModalAttributeBox, 
        ModalTraitType} from "../assets/styled";
import Modal from "react-modal";

const NFT_modal = ({ showModal, setShowModal, nft }) => {
    const handleClose = () => {
        setShowModal(false);
    }
    return (
        <>
            {nft &&
                <Modal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                    ariaHideApp={false}
                    className="w-full m-auto grid place-items-center md:inset-0 h-[calc(100%-10rem)] max-h-full">

                    <ModalDefault>
                        <ModalHeader>
                            <ModalTitle>
                                Name: {nft.name}
                            </ModalTitle>
                            <ModalClose onClick={handleClose}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </ModalClose>
                        </ModalHeader>
                        <ModalContent>
                            <ModalImageContainer>
                                <Image src={nft.image} alt={nft.name} />
                            </ModalImageContainer>
                            <ModalContentCointainer>

                                <ModalContentHeader>
                                    Description:
                                </ModalContentHeader>
                                <DescriptionP>
                                    {nft.description}
                                </DescriptionP>
                                <ModalContentHeader>
                                    Attributes:
                                </ModalContentHeader>
                                <ModalAtributesContainer>
                                    {nft.attributes &&
                                        nft.attributes.map((attribute, i) =>
                                            <ModalAttributeBox key={i}>
                                                <ModalTraitType className="text-l font-semibold mr-2 inline">{attribute.trait_type}: </ModalTraitType>
                                                <p>{attribute.value}</p>
                                            </ModalAttributeBox>
                                        )}
                                </ModalAtributesContainer>
                            </ModalContentCointainer>
                        </ModalContent>
                        <div className="flex items-center border-t border-gray-600 rounded-b">
                            <ButtonRed
                                onClick={handleClose}
                               >
                                Close
                            </ButtonRed>
                        </div>

                    </ModalDefault>

                </Modal>
            }
        </>
    )
}

export default NFT_modal

