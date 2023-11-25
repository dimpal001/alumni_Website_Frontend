import { DeleteIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const DeleteDegreeAlert = ({ isOpen, name, onClose, onDeleteDegree }) => {
  const cancelRef = React.useRef()

  const deleteDegree = async () => {
    try {
      onDeleteDegree()
      onClose()
    } catch (error) {
      onClose()
      console.log(error)
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className='dark:bg-slate-800 max-sm:mx-3 dark:text-white'>
            <AlertDialogBody className='mt-6'>
              <Text className='font-bold text-lg'>
                Remove <strong className='text-primary'>{name}</strong> ?
              </Text>
              <span className='text-sm font-semibold text-red-600'>
                This action cannot be undone.
              </span>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                className='dark:bg-slate-700 dark:text-white hover:dark:text-slate-900'
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                background='red.600'
                color={'white'}
                _hover={{ background: 'red.700' }}
                onClick={() => deleteDegree()}
                ml={3}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteDegreeAlert
