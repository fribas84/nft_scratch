import { ButtonRed } from "../assets/styled";
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

                    ariaHideApp={false}>
                    <div className='justify-center items-center flex flex-col h-3/4'>
                        <div className='self-center text-3xl font-semibold'>
                            {nft.name}
                        </div>
                        <ButtonRed
                            onClick={handleClose}
                            className="fluid px-4 text-xl text-white bg-red-600 border-l mt-10 rounded-lg ml-2">
                            Close
                        </ButtonRed>
                    </div>

                </Modal>
            }
        </>
    )
}





export default NFT_modal