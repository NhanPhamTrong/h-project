import { Navbar } from "./Navbar/Navbar"
import { MainSection } from "./MainSection/MainSection"
import { MainSectionData } from "./MainSection/MainSectionData"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

export const App = () => {
    const [dataIndex, setDataIndex] = useState(0)

    const ClickMember = (name) => {
        MainSectionData.forEach((data) => {
            if (data.name === name) {
                setDataIndex(MainSectionData.indexOf(data))
            }
        })
    }

    return (
        <>
            <Navbar onClickMember={ClickMember} />
            
            <main>
                <AnimatePresence>
                    <MainSection data={MainSectionData[dataIndex]} />
                </AnimatePresence>
            </main>
        </>
    )
}