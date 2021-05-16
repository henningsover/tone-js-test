import React from 'react'

import TheHeader from '../../components/TheHeader'

export default function DefaultLayout({children}) {
  return (
    <>
      <TheHeader />
      {children}
    </>
  )
}
