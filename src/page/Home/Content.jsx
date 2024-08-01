import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Content({ focusFrom  }) {
  return (
    <div id="content" className="no-sidebar">
      <section className="banner-module">
        <div className="banner-module__image-wrapper">
          <img
            className="banner-module__image lazyautosizes ls-is-cached lazyloaded"
            src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
            alt="A middle aged son and daughter walking with their elderly mother in a park"
            style={{ objectPosition: "66% 0%" }}
            data-src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
            decoding="async"
            data-srcset="https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg 768w,
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
            data-sizes="auto"
            data-eio-rwidth="1856"
            data-eio-rheight="896"
            sizes="1865px"
            srcSet="
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg   768w,
                    https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg
                  "
          />
          <noscript>
            <img
              className="banner-module__image"
              src="https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg"
              alt="A middle aged son and daughter walking with their elderly mother in a park"
              srcSet="
                      https://www.careconnect.org.au/wp-content/uploads/2023/08/b-hp-mobile-var-1-928x448.jpg   768w,
                      https://www.careconnect.org.au/wp-content/uploads/2023/08/ab-hp-desktop-var-1-1856x896.jpg
                    "
              sizes="100vw"
              style={{ objectPosition: "66% 0%" }}
              data-eio="l"
            />
          </noscript>
        </div>

        <div className="banner-module__wrapper wrap cf">
          <div
            className="banner-module__textbox banner-module__textbox--eggshell translucent is-visible"
            data-animate=""
          >
            <h1 className="banner-module__title">
              ''Chăm sóc bằng cả trái tim - Nâng niu tuổi vàng, trọn vẹn yêu
              thương."
            </h1>
            <div className="banner-module__description">
              Cho dù ba mẹ bạn đang ở giai đoạn nào trong hành trình chăm sóc
              sức khỏe, đội ngũ tận tâm và đáng tin cậy của CareConnect luôn sẵn
              sàng đồng hành cùng gia đình bạn.
            </div>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="wrap cf ">
          <div className="intro__wrapper intro__wrapper--center ">
            <h2 className="intro__title">
              CareConnect - Vì một tuổi già an yên cho ba mẹ và sự an tâm cho
              bạn, hãy kết nối với chúng tôi ngay hôm nay.
            </h2>

            <img
              className="intro__separator ls-is-cached lazyloaded"
              src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
              data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
              decoding="async"
              alt="careconnect"
            />
            <noscript>
              <img
                className="intro__separator"
                src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                data-eio="l"
                alt="careconnect"
              />
            </noscript>
            <div className="intro__description">
              <p>
                CareConnect tạo ra một môi trường sống ấm áp, thân thiện và đầy
                tình yêu thương cho người cao tuổi.
              </p>
              <p>
                CareConnect không chỉ cung cấp các dịch vụ chăm sóc cơ bản mà
                còn quan tâm đến đời sống tinh thần, giúp người cao tuổi cảm
                thấy được kết nối và yêu thương.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tile-grid tile-grid--eggshell">
        <div className="wrap cf">
          <h2 className="tile-grid__title">
            CareConnect có thể giúp gì cho bạn?
          </h2>

          <ul className="tile-grid__row tile-grid__row--simple">
            <li className="tile-grid__tile-wrapper">
              <div className="tile-grid__tile tile-grid__tile--simple">
                <div className="tile-grid__image-wrapper">
                  <img
                    className="tile-grid__image lazyloaded"
                    src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                    alt="người cao tuổi"
                    data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                    decoding="async"
                    data-eio-rwidth="468"
                    data-eio-rheight="469"
                  />
                  <noscript>
                    <img
                      className="tile-grid__image"
                      src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_ChangeHCP-468x469.png"
                      alt="người cao tuổi"
                      data-eio="l"
                    />
                  </noscript>
                </div>

                <p className="tile-grid__tile-title">Tín nhiệm và tin tưởng</p>

                <p className="tile-grid__description"></p>
              </div>
            </li>
            <li className="tile-grid__tile-wrapper">
              <div className="tile-grid__tile tile-grid__tile--simple">
                <div className="tile-grid__image-wrapper">
                  <img
                    className="tile-grid__image lazyloaded"
                    src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                    alt="người cao tuổi"
                    data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                    decoding="async"
                    data-eio-rwidth="468"
                    data-eio-rheight="468"
                  />
                  <noscript>
                    <img
                      className="tile-grid__image"
                      src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Support_Icons_-_IndependentAdvice-468x468.png"
                      alt="người cao tuổi"
                      data-eio="l"
                    />
                  </noscript>
                </div>

                <p className="tile-grid__tile-title">Quan tâm và theo dõi</p>

                <p className="tile-grid__description"></p>
              </div>
            </li>
            <li className="tile-grid__tile-wrapper">
              <div className="tile-grid__tile tile-grid__tile--simple">
                <div className="tile-grid__image-wrapper">
                  <img
                    className="tile-grid__image lazyloaded"
                    src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                    alt="người cao tuổi"
                    data-src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                    decoding="async"
                    data-eio-rwidth="468"
                    data-eio-rheight="469"
                  />
                  <noscript>
                    <img
                      className="tile-grid__image"
                      src="https://www.careconnect.org.au/wp-content/uploads/2022/12/Package_Icons_-_OHC-468x469.png"
                      alt="người cao tuổi"
                      data-eio="l"
                    />
                  </noscript>
                </div>

                <p className="tile-grid__tile-title">Chưa bao giờ là muộn</p>

                <p className="tile-grid__description"></p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="spacer--negative-md"></div>

      <section className="quote quote--white">
        <div className="wrap cf">
          <div className="quote__wrapper quote__wrapper--vertical">
            <div className="quote__image-wrapper">
              <div className="video-content">
                <Link
                  to="/"
                  href="https://www.youtube.com/watch?v=qRu9N3gteT8"
                  className="gtrackexternal"
                >
                  <img
                    className="quote__image skip-lazy"
                    src="https://i.ytimg.com/vi/qRu9N3gteT8/mqdefault.jpg"
                    alt="Graham, Jocelyn &amp; Carissa | CareConnect"
                    srcSet="
                            https://i.ytimg.com/vi/qRu9N3gteT8/mqdefault.jpg     480w,
                            https://i.ytimg.com/vi/qRu9N3gteT8/maxresdefault.jpg
                          "
                    sizes="100vw"
                    loading="lazy"
                  />
                  <div className="video-play-button">
                    <i className="fa fa-play" aria-hidden="true"></i>
                    <span>Phát ngay</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="quote__box quote__box--pale-blue">
              <h3 className="quote__opening">
                Nhờ CareConnect, tôi luôn được thông báo kịp thời về mọi thay
                đổi trong chế độ chăm sóc của ba mẹ, đồng thời thấy được sự quan
                tâm và thấu hiểu của đội ngũ chăm sóc qua những thông tin chi
                tiết và hình ảnh được chia sẻ.
                {/* <span className="quote__closing"></span> */}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="spacer--negative-md"></div> */}

      <section className="intro">
        <div className="wrap cf">
          <div className="intro__wrapper intro__wrapper--center">
            <h2 className="intro__title">
              CareConnect là một nền tảng trực tuyến và là ứng dụng di động giúp
              kết nối người cao tuổi, gia đình họ và nhân viên viện dưỡng lão.
              Nền tảng này có thể cung cấp các tính năng như theo dõi sức khỏe,
              đặt lịch hẹn, lựa chọn dịch vụ cho người cao tuổi.
            </h2>

            <img
              className="intro__separator lazyloaded "
              src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
              data-src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
              decoding="async"
              alt="careconnectadmin"
            />
            <noscript>
              <img
                className="intro__separator"
                src="https://www.careconnect.org.au/wp-content/themes/careconnect2018/images/separator.svg"
                data-eio="l"
                alt="careconnect"
              />
            </noscript>
          </div>
        </div>
      </section>
      {/* <div className="spacer--sm"></div> */}

      <section className="quote quote--white">
        <div className="wrap cf">
          <div className="quote__wrapper quote__wrapper--vertical">
            <div className="quote__image-wrapper">
              <div className="video-content">
                <Link
                  to="/"
                  href="https://www.youtube.com/watch?v=rLnH4RDBGvk"
                  className="gtrackexternal"
                >
                  <img
                    className="quote__image skip-lazy"
                    src="https://i.ytimg.com/vi/rLnH4RDBGvk/mqdefault.jpg"
                    alt="Kevin &amp; Aurelie | CareConnect"
                    srcSet="
                            https://i.ytimg.com/vi/rLnH4RDBGvk/mqdefault.jpg     480w,
                            https://i.ytimg.com/vi/rLnH4RDBGvk/maxresdefault.jpg
                          "
                    sizes="100vw"
                    loading="lazy"
                  />
                  <div className="video-play-button">
                    <i className="fa fa-play" aria-hidden="true"></i>
                    <span>Phát ngay</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="quote__box quote__box--green">
              <h3 className="quote__opening">
                Tôi rất hài lòng với cách CareConnect chăm sóc cho gia đình tôi
              </h3>

              <p className="quote__closing">
                Họ rất nhiệt tình và luôn tìm cách giải quyết mọi nhu cầu của
                gia đình tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="latest-news">
        <div className="wrap">
          <div className="latest-news__inner">
            <h2 className="latest-news__title">Tin tức mới nhất</h2>
            <p className="latest-news__intro">&nbsp;</p>

            <ul className="latest-news__card-grid card-grid card-grid--news">
              <li className="latest-news__list-item">
                <Link
                  to="/"
                  rticle
                  className="post-9019 post type-post status-publish format-standard has-post-thumbnail category-health-wellbeing"
                >
                  <Link
                    to="/"
                    className="card card--news card--standard-news gtrackexternal"
                    href="https://www.careconnect.org.au/2024/06/staying-connected-and-social/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                    aria-labelledby="card-title-9019"
                    aria-describedby="card-desc-9019"
                  >
                    <div className="card__top">
                      <img
                        width="300"
                        height="300"
                        src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                        className="card__image wp-post-image lazyautosizes ls-is-cached lazyloaded"
                        alt="người cao tuổi"
                        decoding="async"
                        data-src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                        data-srcset="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png 300w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png 468w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png 684w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png 768w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png 125w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png 545w, https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w"
                        data-sizes="auto"
                        data-eio-rwidth="300"
                        data-eio-rheight="300"
                        sizes="307px"
                        srcSet="
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png    300w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png    468w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png    684w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png    768w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png    125w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png    545w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w
                              "
                      />
                      <noscript>
                        <img
                          width="300"
                          height="300"
                          src="https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png"
                          className="card__image wp-post-image"
                          alt="người cao tuổi"
                          decoding="async"
                          srcSet="
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-300x300.png    300w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-468x468.png    468w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-684x684.png    684w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-768x768.png    768w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1536x1536.png 1536w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-2048x2048.png 2048w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-125x125.png    125w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-545x545.png    545w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/06/social-tile-june-3-01-1090x1090.png 1090w
                                "
                          sizes="(max-width: 300px) 100vw, 300px"
                          data-eio="l"
                        />
                      </noscript>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title" id="card-title-9019">
                        Duy trì kết nối và hòa nhập cộng đồng
                      </h3>
                      <div className="card__meta">
                        <div className="card__tag tag tag--lightblue">
                          Sức khỏe &amp; An sinh
                        </div>
                        <span className="card__timestamp">
                          3 tháng 6 năm 2024
                        </span>
                      </div>
                      <p className="card__excerpt" id="card-desc-9019">
                        Thời tiết lạnh và ẩm ướt thường khiến chúng ta ở nhà,
                        điều này có thể gây ra sự cô lập và cô đơn cho một số
                        người. Việc duy trì kết nối với người khác là vô cùng
                        quan trọng ở mọi lứa tuổi, đặc biệt khi chúng ta lớn
                        tuổi hơn.
                      </p>
                      <div className="card__actions card__actions--no-border">
                        <p className="card__fake-link">
                          Đọc thêm
                          <span className="card__fake-link__arrow">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Link>
              </li>
              <li className="latest-news__list-item">
                <Link
                  to="/"
                  rticle
                  id="post-8996"
                  className="post-8996 post type-post status-publish format-standard has-post-thumbnail category-book-review"
                >
                  <Link
                    to="/"
                    className="card card--news card--standard-news gtrackexternal"
                    href="https://www.careconnect.org.au/2024/04/stellas-book-review-2/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                    aria-labelledby="card-title-8996"
                    aria-describedby="card-desc-8996"
                  >
                    <div className="card__top">
                      <img
                        width="300"
                        height="300"
                        src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                        className="card__image wp-post-image lazyautosizes lazyloaded"
                        alt="Book review image with Stella's Book of the Month"
                        decoding="async"
                        data-src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                        data-srcset="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg 300w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg 468w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg 684w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg 768w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg 125w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg 545w, https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg 1080w"
                        data-sizes="auto"
                        data-eio-rwidth="300"
                        data-eio-rheight="300"
                        sizes="257px"
                        srcSet="
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg  300w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg  468w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg  684w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg  768w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg  125w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg  545w,
                                https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg         1080w
                              "
                      />
                      <noscript>
                        <img
                          width="300"
                          height="300"
                          src="https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg"
                          className="card__image wp-post-image"
                          alt="Book review image with Stella&#039;s Book of the Month"
                          decoding="async"
                          srcSet="
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-300x300.jpg  300w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-468x468.jpg  468w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-684x684.jpg  684w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-768x768.jpg  768w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-125x125.jpg  125w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post-545x545.jpg  545w,
                                  https://www.careconnect.org.au/wp-content/uploads/2024/04/Black-and-Beige-Simple-Book-Mockup-Instagram-Post.jpg         1080w
                                "
                          sizes="(max-width: 300px) 100vw, 300px"
                          data-eio="l"
                        />
                      </noscript>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title" id="card-title-8996">
                        Bài đánh giá sách Stella
                      </h3>
                      <div className="card__meta">
                        <div className="card__tag tag tag--lightblue">
                          Đánh giá sách
                        </div>
                        <span className="card__timestamp">
                          19 tháng 4 năm 2024
                        </span>
                      </div>
                      <p className="card__excerpt" id="card-desc-8996">
                        Đến lúc thưởng thức một tác phẩm kinh điển! Tiểu thuyết
                        "Câu Chuyện Người Dì" của Patrick White.
                      </p>
                      <div className="card__actions card__actions--no-border">
                        <p className="card__fake-link">
                          Đọc thêm
                          <span className="card__fake-link__arrow">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 15"
                            >
                              <defs></defs>
                              <line
                                className="cls-1"
                                x1="2.12"
                                y1="7.66"
                                x2="16.18"
                                y2="7.66"
                              ></line>
                              <polyline
                                className="cls-1"
                                points="10.29 2.18 16.18 7.66 10.29 13.13"
                              ></polyline>
                            </svg>
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Link>
              </li>
            </ul>

            <div className="latest-news__view-all">
              <Link
                to="/"
                href="https://www.careconnect.org.au/news/latest-news/?__hstc=19301799.15d70e64b6b039fda16f1889d927822c.1719083369639.1719083369639.1719083369639.1&amp;__hssc=19301799.5.1719083369639&amp;__hsfp=2748378142"
                className="downloadable-resource__button button button--secondary button--icon button--large gtrackexternal"
              >
                View all Articles
                <span className="button__icon">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 15"
                  >
                    <defs></defs>
                    <line
                      className="cls-1"
                      x1="2.12"
                      y1="7.66"
                      x2="16.18"
                      y2="7.66"
                    ></line>
                    <polyline
                      className="cls-1"
                      points="10.29 2.18 16.18 7.66 10.29 13.13"
                    ></polyline>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
