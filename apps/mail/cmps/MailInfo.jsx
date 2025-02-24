const { useSearchParams, useNavigate, useParams } = ReactRouterDOM

export function MailInfo() {
  const { mailId } = useParams()

  return (
    <section className="view-mail">
      <div className="nav-bar-view"></div>
      <h2>Title</h2>
      <p className="mail-info">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        magnam accusamus corporis dolorem, adipisci nam aliquam omnis nobis
        illum accusantium itaque a sequi mollitia autem nisi iusto ducimus
        tempora cum.
      </p>
    </section>
  )
}
