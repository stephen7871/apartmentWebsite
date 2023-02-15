import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '/Users/stephenmcnally/Cropped/image-crop/src/App'

import './styles.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(<App />)