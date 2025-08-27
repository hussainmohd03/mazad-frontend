const EditProfile = () => {
  return (
    <>
      <p className="profile-header">Edit Personal Info</p>
      <img src="/design-images/default_icon.svg" alt="" />
      <form>
        <label htmlFor="name" className="input-key">
          Name
        </label>
        <input type="text" />
      </form>
    </>
  )
}

export default EditProfile
