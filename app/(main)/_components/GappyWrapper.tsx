"use client"
import React from 'react'
import { Root, CopilotWindowWithTrigger } from "@gappy/gappy-react"
import "@gappy/gappy-react/index.css"

const GappyWrapper = ({ children }: { children: React.ReactNode }) => {

    const options = {
        initialMessage:
            "👋 Hey! Welcome to Gappy.ai, your go-to place for content creation and AI chatbots. Got questions? Just ask!",
        token: "eyJraWQiOiJzLTQwMTQwNWNlLTE1YmQtNGNkMS1hZWNhLWYwNmJlMWQ1NGM1OCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJpYXQiOjE3MDg3MTQ0NzQsImV4cCI6NDg2MjMxNDQ3NCwiaXNzIjoiaHR0cHM6Ly9nYXBweS1kZXYtYXBpLmhhcHB5c2t5LWVjMTQwZTVlLmNlbnRyYWxpbmRpYS5henVyZWNvbnRhaW5lcmFwcHMuaW8iLCJpZCI6IjFlZjcxM2MxLTdiMmUtNGYyYy05NDZiLWZhZmI5OWFiZmU4YyIsInByb2plY3RfaWQiOiJmZjgyOGM0MS0wZmI0LTRjODgtYWVlMy1iZjM1ZDNkNDY2NGEiLCJlbWFpbCI6ImFiaGF5YjIwMDJAZ21haWwuY29tIn0.J5erjFXb7m1aR--7nT5CsGxqt59tPGS_Gjl_wti-fRqHpDnvlsts4iCINJT02U44m3dOzzNS9mXfBLqH13Qbc-woF0oV8ETQ7jYiSgWnPUFYRPXvl3xN9nmf2EgkJHFxYkSV7I9CrVVi0U3oEgbIm1EWhqCqw6F8w75genB0pN8Tz5lv7zT4sXlKjKOHNQY3BZjsXmJzPW1eLftmOfoMmcO08Rsqg_q10hAlSMIcTp6I35IocPk6_iX2z8P1ar8Zi0Vn0kZoCBFe_NGkfxHv8vPxpYr5431byzxgn23ow3y8k6fRbw-lGDgCrd58HFOOPlIaCtQ93gmrt4qjXnw3zw",
        apiUrl: "https://gappy-dev-api.happysky-ec140e5e.centralindia.azurecontainerapps.io/api",
        defaultOpen: true,
        apiKey: "5856e8937a754f63b8159fd5efe2cd75",
        user: {
            email: "gappy@gmail.com",
            id: "gapy-2024",
            name: "gappy"
        },
    }

    return (
        <Root options={options}>
            {children}
            <CopilotWindowWithTrigger />
        </Root>
    )
}

export default GappyWrapper