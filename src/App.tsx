import { useState } from 'react'
export default function App() { const [c, setC] = useState(0); return <button onClick={() => setC(c+1)}>Count: {c}</button> }