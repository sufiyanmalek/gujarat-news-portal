import React from "react"
import {Navbar} from "../components/Navbar"
import ActiveNewsSection from "../components/ActiveNewsSection"
type Props = {}

export const HomePage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <ActiveNewsSection />
    </div>
  )
}