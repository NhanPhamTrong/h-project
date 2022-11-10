import { Navbar } from "./Navbar/Navbar"
import { MainSection } from "./MainSection/MainSection"
import { Data } from "./Data"
import { Modal } from "./Modal/Modal"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

export const App = () => {
    const [dataIndex, setDataIndex] = useState([0, 0])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)

    const ClickMember = (name) => {
        Data.forEach((data) => {
            data.member.forEach((d) => {
                if (d.name === name) {
                    setDataIndex([Data.indexOf(data), data.member.indexOf(d)])
                }
            })
        })
        setAutoPlay(false)
    }

    const OpenModal = () => {
        setIsOpenModal(true)
    }

    const CloseModal = () => {
        setIsOpenModal(false)
    }

    const SetAutoPlay = () => {
        setAutoPlay(true)
    }

    return (
        <>
            <Navbar onClickMember={ClickMember} />            
            <main>
                <AnimatePresence>
                    <MainSection data={Data[dataIndex[0]].member[dataIndex[1]]} OpenModal={OpenModal} />
                </AnimatePresence>
            </main>
            <Modal data={Data[dataIndex[0]].member[dataIndex[1]]} isOpenModal={isOpenModal} CloseModal={CloseModal} autoPlay={autoPlay} SetAutoPlay={SetAutoPlay} />
        </>
    )
}