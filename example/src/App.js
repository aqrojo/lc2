import React from 'react'

import { MultipleChoice } from 'lemo-lc2'
import 'lemo-lc2/dist/index.css'
import {exerciseData} from './mulitple-choice-data';

const App = () => {
  return <MultipleChoice data={exerciseData} />
}

export default App
