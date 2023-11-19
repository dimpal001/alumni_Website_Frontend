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

const DeleteDepartmentAlert = ({
  isOpen,
  name,
  onClose,
  onDeleteDepartment,
}) => {
  const cancelRef = React.useRef()

  const deleteDepartment = async () => {
    try {
      onDeleteDepartment()
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
          <AlertDialogContent className='dark:bg-slate-900 dark:text-white'>
            <AlertDialogBody className='mt-6'>
              <Text className='font-bold text-lg'>
                Remove <strong className='text-primary'>{name}</strong> ?
              </Text>
              <strong className='text-sm text-[#f23322]'>
                This action cannot be undone.
              </strong>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                className='dark:bg-slate-700 dark:text-white hover:dark:text-slate-900'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                background='red.600'
                _hover={{ background: 'red.700' }}
                onClick={() => deleteDepartment()}
                ml={3}
                color={'white'}
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

export default DeleteDepartmentAlert
