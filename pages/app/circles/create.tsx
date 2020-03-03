import React from 'react'

import AppHeader from '../../../components/app_header'

const CreateCircle = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Create Circle', dest: '/app/circles/create'}]}/>
    </div>
  )
}

export default CreateCircle