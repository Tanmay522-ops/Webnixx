"use client"

import { useState } from "react"

export const useNavigation = () => {
    const [section, setSection] = useState("home")

    const onSetSection = (section: string) => {
        setSection(section)
    }

    return {
        section,
        onSetSection,
    }
}