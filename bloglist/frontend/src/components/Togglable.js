import { useState, forwardRef, useImperativeHandle } from 'react'

import { Button } from '@mui/material'
import { Box } from '@mui/system'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Box p={1}>
        <div style={hideWhenVisible}>
          <Button variant='contained' id={props.buttonId} onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
      </Box>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
