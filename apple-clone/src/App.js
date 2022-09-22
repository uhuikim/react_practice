import { useState, useEffect, useRef, useCallback } from "react";
import "./style/global.css";
import "./style/main.css";

const sceneInfo = [
    {
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
    },
    {
        type: "normal",
        heightNum: 5,
        scrollHeight: 0,
    },
    {
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
    },
    {
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
    },
];

function App() {
    const [yOffset, setYOffset] = useState(0);

    const currentScene = useRef(0);
    const sectionRef = useRef([]);

    const scrollLoop = useCallback(() => {
        let prevScrollHeight = [...sceneInfo].splice(0, currentScene.current).reduce((acc, cur) => {
            return acc + cur.scrollHeight;
        }, 0);

        if (yOffset > prevScrollHeight + sceneInfo[currentScene.current]?.scrollHeight) {
            currentScene.current += 1;
        }
        if (yOffset < prevScrollHeight) {
            currentScene.current -= 1;
        }
        // document.body.setAttribute("id", `show-scene-${currentScene}`);
    }, [yOffset, currentScene]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setYOffset(window.pageYOffset);
            scrollLoop();
        });

        return () =>
            window.removeEventListener("scroll", () => {
                setYOffset(window.pageYOffset);
                scrollLoop();
            });
    }, [scrollLoop]);

    useEffect(() => {
        // layout 설정
        sceneInfo.forEach((scene, i) => {
            scene.scrollHeight = scene.heightNum * window.innerHeight;
            sectionRef.current[i].style.height = `${scene.scrollHeight}px`;
        });
    }, []);

    return (
        <div className="container">
            <nav className="global-nav">
                <div className="global-nav-links">
                    <a href="/" className="gloval-nav-item">
                        Rooms
                    </a>
                    <a href="/" className="gloval-nav-item">
                        Ideas
                    </a>
                    <a href="/" className="gloval-nav-item">
                        Stores
                    </a>
                    <a href="/" className="gloval-nav-item">
                        Contact
                    </a>
                </div>
            </nav>
            <nav className="local-nav">
                <div className="local-nav-links">
                    <a href="/" className="product-name">
                        AirMug Pro
                    </a>
                    <a href="/">개요</a>
                    <a href="/">제품사양</a>
                    <a href="/">구입하기</a>
                </div>
            </nav>
            <section className="scroll-section" id="scroll-section-0" ref={(el) => (sectionRef.current[0] = el)}>
                <h1>AirMug Pro</h1>
                <div className="sticky-elem main-message">
                    <p>
                        온전히 빠져들게 하는 <br />
                        최고급 세라믹
                    </p>
                </div>
                <div className="sticky-elem main-message">
                    <p>
                        주변 맛을 느끼게 해주는 <br />
                        주변 맛 허용 모드
                    </p>
                </div>
                <div className="sticky-elem main-message">
                    <p>
                        온종일 편안한 <br />
                        맞춤형 손잡이
                    </p>
                </div>
                <div className="sticky-elem main-message">
                    <p>
                        새롭게 입가를
                        <br />
                        찾아온 매혹
                    </p>
                </div>
            </section>
            <section className="scroll-section" id="scroll-section-1" ref={(el) => (sectionRef.current[1] = el)}>
                <p className="description">
                    <strong>보통 스크롤 영역</strong>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, tempore mollitia magnam delectus facilis, iure atque laudantium a labore recusandae vero perspiciatis quibusdam sequi,
                    asperiores rem dolorem temporibus quidem obcaecati velit! Maiores quam mollitia consectetur. Commodi laudantium expedita quasi ut perspiciatis quaerat? Iste, odit cum? Facere ut
                    veniam nisi magnam repellat provident aliquid? Laudantium expedita fugit cum facere. Adipisci iste ipsa aliquid unde vitae, nam voluptate, maxime, error commodi neque ullam
                    suscipit amet. Possimus error consequatur reprehenderit ea illo. Iusto dignissimos consequatur hic fugiat omnis illum fuga provident esse quam quis exercitationem quaerat inventore
                    nam molestiae excepturi, dolores doloribus dolorum voluptates dicta reiciendis repudiandae impedit expedita nisi cum. Consectetur esse beatae delectus perspiciatis quod excepturi
                    commodi, ex adipisci sunt enim soluta incidunt, aliquam id nam repellendus sed neque! Labore in ipsa ea impedit commodi explicabo iure facilis, modi molestias, est quasi quam
                    maiores debitis sunt, recusandae qui. Maxime eos vitae error nemo obcaecati debitis. Labore, suscipit perferendis modi minima voluptatum ea similique quam repellat necessitatibus
                    beatae ex amet sunt, reiciendis vero odio ducimus sed molestiae totam velit quo eius quaerat. Adipisci cupiditate ratione veniam totam sint rerum ipsam magnam optio blanditiis
                    magni! Nostrum laudantium quod aut velit unde officiis laborum.
                </p>
            </section>
            <section className="scroll-section" id="scroll-section-2" ref={(el) => (sectionRef.current[2] = el)}>
                <div className="sticky-elem main-message">
                    <p>
                        <small>편안한 촉감</small>
                        입과 하나 되다
                    </p>
                </div>
                <div className="sticky-elem desc-message">
                    <p>
                        편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는
                        감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
                    </p>
                    <div className="pin"></div>
                </div>
                <div className="sticky-elem desc-message">
                    <p>
                        디자인 앤 퀄리티 오브 스웨덴,
                        <br />
                        메이드 인 차이나
                    </p>
                    <div className="pin"></div>
                </div>
            </section>
            <section className="scroll-section" id="scroll-section-3" ref={(el) => (sectionRef.current[3] = el)}>
                <p className="mid-message">
                    <strong>Retina 머그</strong>
                    <br />
                    아이디어를 광활하게 펼칠
                    <br />
                    아름답고 부드러운 음료 공간.
                </p>
                <p className="canvas-caption">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet at fuga quae perspiciatis veniam impedit et, ratione est optio porro. Incidunt aperiam nemo voluptas odit quisquam
                    harum in mollitia. Incidunt minima iusto in corporis, dolores velit. Autem, sit dolorum inventore a rerum distinctio vero illo magni possimus temporibus dolores neque adipisci,
                    repudiandae repellat. Ducimus accusamus similique quas earum laborum. Autem tempora repellendus asperiores illum ex! Velit ea corporis odit? Ea, incidunt delectus. Sapiente rerum
                    neque error deleniti quis, et, quibusdam, est autem voluptate rem voluptas. Ratione soluta similique harum nihil vel. Quas inventore perferendis iusto explicabo animi eos ratione
                    obcaecati.
                </p>
            </section>
            <footer className="footer">2022, 우히</footer>
        </div>
    );
}

export default App;
