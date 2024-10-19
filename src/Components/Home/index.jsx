
const Home = () => {
  return (
    <div className={`d-flex flex-column justify-content-center align-items-center`}>
      <h1>En desarrollo ...</h1>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/Veterinary-cuate.png`}
        alt={`dog entering a door simulating login icon`}
        className={`img img-fluid`}
      />
    </div>
  )
}

export default Home
