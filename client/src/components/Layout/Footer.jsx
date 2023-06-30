import "./Footer.css";

export default function Footer() {
  return (
    <div className="section-footer border-top text-center" style={{backgroundColor : "#eee"}}>
      {" "}
      <output className=" shadow-sm">
        <footer className="section-footer border-top">
          <div className="container-fluid">
            <section className="footer-top padding-y">
              <div className="row">
                <aside className="col-md-4">
                  <article className="mr-3">
                    {" "}
                    <img
                      src="https://i.imgur.com/S5Zdt8L.png"
                      className="logo-footer"
                    />
                    <p className="mt-3 description">
                      Some short text about company like You might remember the
                      Dell computer commercials in which a youth reports this
                      exciting news to his friends.
                    </p>
                    
                  </article>
                </aside>
                <aside className="col-sm-3 col-md-2">
                  <h6 className="title">About</h6>
                  <ul className="list-unstyled">
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        About us
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Services
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Terms &amp; Condition
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Our Blogs
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-sm-3 col-md-2">
                  <h6 className="title">Services</h6>
                  <ul className="list-unstyled">
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Help center
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Money refund
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Terms and Policy
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        Open dispute
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-sm-3 col-md-2">
                  <h6 className="title">For users</h6>
                  <ul className="list-unstyled">
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        {" "}
                        User Login{" "}
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        {" "}
                        User register{" "}
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        {" "}
                        Account Setting{" "}
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#" data-abc="true">
                        {" "}
                        My Orders{" "}
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-sm-2 col-md-2">
                  <h6 className="title">Our app</h6>{" "}
                  <a href="#" className="d-block mb-2" data-abc="true">
                    <img
                      className="img-responsive"
                      src="https://i.imgur.com/nkZP7fe.png"
                      height={40}
                    />
                  </a>{" "}
                  <a href="#" className="d-block mb-2" data-abc="true">
                    <img
                      className="img-responsive"
                      src="https://i.imgur.com/47q2YGt.png"
                      height={40}
                      width={123}
                    />
                  </a>
                </aside>
              </div>
            </section>
            <section className="footer-copyright border-top">
              <p className="float-left text-muted">
                {" "}
                © 2019 Talkdesk All rights resetved{" "}
              </p>
              <p className="float-right text-muted">
                {" "}
                <a href="#" data-abc="true">
                  Privacy &amp; Cookies
                </a>{" "}
                &nbsp; &nbsp;{" "}
                <a href="#" data-abc="true">
                  Accessibility
                </a>{" "}
              </p>
            </section>
          </div>
        </footer>
      </output>{" "}
    </div>
  );
}
