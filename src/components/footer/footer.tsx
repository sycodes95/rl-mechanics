
function Footer (){
  return (
    <div className="flex items-center justify-center w-full p-8 border-black bg-zinc-950">
      <div className="flex justify-between w-full max-w-4xl gap-2 mw-480px-flex-col">
        <section className="flex flex-col text-sm text-white font-rajdhani">
          <div className="text-2xl font-nakelin">RL MECHANICS</div>
          <div>
            <p className="">Not affiliated with Rocket League</p>
            <p>2023 © RLMECHANICS.COM</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 text-sm text-white font-rajdhani ">
          <div className="">Any Questions or Suggestions?</div>
          <div className="">
            <a className="p-2 border border-white rounded-sm bg-opacity-10 hover:bg-white hover:bg-opacity-10" href="mailto:rlmechanicsgg@gmail.com">Contact Us</a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Footer;