import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const brandColor = {
  primary: '#00cc00',
  secondary: '#009900',
  success: '#00cc00',
  successHover: '#009900',
  error: '#e62e00',
  errorHover: '#b30000',
}

export const CButton = ({
  title,
  leftIcon,
  rightIcon,
  size,
  type,
  isDisabled,
  onClick,
  width,
  isLoading,
  loadingText,
}) => {
  return (
    <Button
      isDisabled={isDisabled}
      width={width}
      onClick={onClick}
      isLoading={isLoading}
      loadingText={loadingText}
      rightIcon={rightIcon}
      type={type}
      leftIcon={leftIcon}
      background={brandColor.primary}
      paddingInline={4}
      size={size}
      _hover={{ background: brandColor.secondary }}
      color={'white'}
    >
      {title}
    </Button>
  )
}

export const CInput = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  value,
  star,
}) => {
  return (
    <FormControl className='py-2'>
      <FormLabel>
        <div className='flex gap-x-1'>
          <p>{label}</p>
          {star && <p className='text-error'>*</p>}
        </div>
      </FormLabel>
      <Input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </FormControl>
  )
}
