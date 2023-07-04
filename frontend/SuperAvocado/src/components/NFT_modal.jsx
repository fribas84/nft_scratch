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
                    ariaHideApp={false}
                    className="w-full grid place-items-center md:inset-0 h-[calc(100%-1rem)] max-h-full">

                    <div className="relative w-full max-w-2xl max-h-full">

                        <div className="relative rounded-lg shadow bg-green-200">
                            <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {nft.name}
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="flex relative">
                                <div className="md:w-1/2 lg:w-2/5 m-2">
                                    <img className="w-full rounded-xl" src={nft.image} alt={nft.name} />
                                </div>
                                <div className='md:w-1/2 lg:w-3/5 overflow-scroll m-10'>
                                    <div>
                                        <p className="text-base leading-relaxed">
                                            {nft.description}
                                        </p>

                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center border-t border-gray-600 rounded-b">
                                <ButtonRed
                                    onClick={handleClose}
                                    className="fluid text-xl text-white bg-red-600 border-l rounded-lg">
                                    Close
                                </ButtonRed>
                            </div>
                        </div>
                    </div>

                </Modal>
            }
        </>
    )
}

export default NFT_modal

