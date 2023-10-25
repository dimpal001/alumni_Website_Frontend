import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

export const brandColor = {
  first: '#e6005c',
  second: '#b30047',
  dark: '#b3b3b3',
}

export const Button1 = ({ title, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='px-4 py-1 shadow-xl hover:shadow-gray-500 hover:border-[#b30047] text-white transition-all delay-75 ease-linear font-bold border-2 border-[#e6005c] bg-[#e6005c] rounded-md '
    >
      {title}
    </button>
  )
}
export const Button2 = ({ title, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='px-4 py-1 border-2 shadow-xl hover:shadow-gray-500 border-[#e6005c] hover:bg-[#e6005c] transition-all delay-75 ease-linear hover:text-white text-[#e6005c] font-bold rounded-md '
    >
      {title}
    </button>
  )
}
export const CButton1 = ({
  title,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  isLoading,
  loadingText,
  width,
}) => {
  return (
    <Button
      width={width}
      onClick={onClick}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isLoading={isLoading}
      loadingText={loadingText}
      background={brandColor.first}
      _hover={{ background: brandColor.second }}
      px={7}
      color={'white'}
    >
      {title}
    </Button>
  )
}
export const CButton2 = ({
  title,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  isLoading,
  loadingText,
  width,
}) => {
  return (
    <Button
      width={width}
      onClick={onClick}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isLoading={isLoading}
      loadingText={loadingText}
      background={'transparent'}
      borderWidth={1}
      borderColor={'white'}
      _hover={{ background: 'transparent' }}
      px={7}
      color={'white'}
    >
      {title}
    </Button>
  )
}
export const StaticButton = ({ title, bgColor }) => {
  return (
    <Button
      width={'120px'}
      background={bgColor}
      cursor={'default'}
      _hover={{ background: bgColor }}
      px={7}
      color={'white'}
    >
      {title}
    </Button>
  )
}

export const IconInput = ({
  width,
  icon,
  placeholder,
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <InputGroup className='bg-slate-200 rounded-lg dark:bg-slate-900' my={4}>
      <InputLeftElement pointerEvents='none'>{icon}</InputLeftElement>
      <Input
        width={width}
        color={brandColor.first}
        fontWeight={'bold'}
        fontFamily={'arial'}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </InputGroup>
  )
}
export const LabelInput2 = ({
  placeholder,
  type,
  label,
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <FormControl
      className='dark:bg-slate-900 bg-slate-200 rounded-lg p-2 '
      my={4}
    >
      <FormLabel my={1} className='dark:text-white text-sm'>
        {label}
      </FormLabel>
      <Input
        className='dark:bg-slate-800 bg-slate-50-50'
        disabled={disabled}
        background={'white'}
        color={brandColor.first}
        fontWeight={'bold'}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </FormControl>
  )
}
export const LabelInput = ({
  placeholder,
  type,
  label,
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <FormControl
      className='dark:bg-slate-900 bg-slate-200 rounded-lg p-2 '
      my={4}
    >
      <p className='text-sm dark:text-slate-50'>{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className='dark:bg-slate-900 dark:text-slate-50 placeholder:text-base focus:outline-none font-bold border-b-2 border-slate-900 w-[100%] text-lg focus:border-slate-900 dark:focus:border-slate-100 bg-slate-200'
        disabled={disabled}
      />
    </FormControl>
  )
}
