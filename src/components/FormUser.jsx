import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/FormUser.css'


const FormUser = ({ createUsers, userSelected, updateUsers, setUserSelected, formIsOpen, setFormIsOpen }) => {
    const { handleSubmit, register, formState: {errors}, reset } = useForm()

    useEffect(() => {
        reset(userSelected)

      }, [userSelected])

    const submit = data => {
        if(userSelected){
            //update
            updateUsers(userSelected.id, data)
            setUserSelected() 
        } else{
            //create
            createUsers(data)
        }
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: ''
          })
          setFormIsOpen(false)
        }        


        const handleExit = () => {
          setFormIsOpen(false)
          reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: ''
          })
          setUserSelected()          
        }

  return (
    <div className={`form-container ${formIsOpen || 'form__close'}`}>
      <form className='form' onSubmit={handleSubmit(submit)} >
        <span className='form__exit' onClick={handleExit}>x</span>
        <h2 className='form__title'>{userSelected ? 'Register Form' : 'Create user Form'}</h2>
        <div className='form__list'>
        <label className='form__field'>
          <span className='form__label'>Email *</span>
          <input className='form__input' {...register('email', {required: true, pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} placeholder='example@mail.com'/>
            <span className='form__validator'>{errors.email?.type === 'required' && "This field is required"}</span>
            <span className='form__validator'>{errors.email?.type === 'pattern' && "The email format is not valid"}</span>
        </label>
        <label className='form__field'>
          <span className='form__label'>Password *</span>
          <input className='form__input' {...register('password', {required:true, minLength:8})} type="password" placeholder='********'/>
            <span className='form__validator'>{errors.password?.type === 'required' && "This field is required"}</span>
            <span className='form__validator'>{errors.password?.type === 'minLength' && "The field must have a minimum of 8 characters"}</span>
        </label>
        <label className='form__field'>
          <span className='form__label'>First Name *</span>
          <input className='form__input' {...register('first_name', {required:true})} type="text" placeholder='Your name'/>
            <span className='form__validator'>{errors.first_name && 'This field is required'}</span>
        </label>
        <label className='form__field'>
          <span className='form__label'>Last Name</span>
          <input className='form__input' {...register('last_name')} type="text" placeholder='Last name' />
        </label>
        <label className='form__field'>
          <span className='form__label'>Birthday *</span>
          <input className='form__input' {...register('birthday', {required:true})} type="date"/>
            <span className='form__validator'>{errors.birthday && 'This field is required'}</span>
        </label>
        </div>
        <button className='form__btn'>Submit</button>
      </form>
    </div>
  )
}

export default FormUser