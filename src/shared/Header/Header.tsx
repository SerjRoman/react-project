import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Header.css";

export function Header() {
	// const [count, setCount] = useState(0) // useState принимает инициальное значение
	return (
		<div>
			<header>
				<Link to="/">
					<img
						className="logo"
						src="https://cdn-icons-png.flaticon.com/512/7817/7817669.png"
						alt=""
					/>
				</Link>

				<Link to="/products">
					<button className="categories">
						<svg
							className="categoriesSvg"
							width="26"
							height="16"
							viewBox="0 0 26 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.77778 3.66667V0.777779H26V3.66667H5.77778ZM5.77778 9.44444V6.55556H26V9.44444H5.77778ZM5.77778 15.2222V12.3333H26V15.2222H5.77778ZM1.44444 3.66667C1.03519 3.66667 0.69213 3.52824 0.415278 3.25139C0.138426 2.97454 0 2.63148 0 2.22222C0 1.81296 0.138426 1.46991 0.415278 1.19306C0.69213 0.916205 1.03519 0.777779 1.44444 0.777779C1.8537 0.777779 2.19676 0.916205 2.47361 1.19306C2.75046 1.46991 2.88889 1.81296 2.88889 2.22222C2.88889 2.63148 2.75046 2.97454 2.47361 3.25139C2.19676 3.52824 1.8537 3.66667 1.44444 3.66667ZM1.44444 9.44444C1.03519 9.44444 0.69213 9.30602 0.415278 9.02917C0.138426 8.75232 0 8.40926 0 8C0 7.59074 0.138426 7.24769 0.415278 6.97083C0.69213 6.69398 1.03519 6.55556 1.44444 6.55556C1.8537 6.55556 2.19676 6.69398 2.47361 6.97083C2.75046 7.24769 2.88889 7.59074 2.88889 8C2.88889 8.40926 2.75046 8.75232 2.47361 9.02917C2.19676 9.30602 1.8537 9.44444 1.44444 9.44444ZM1.44444 15.2222C1.03519 15.2222 0.69213 15.0838 0.415278 14.8069C0.138426 14.5301 0 14.187 0 13.7778C0 13.3685 0.138426 13.0255 0.415278 12.7486C0.69213 12.4718 1.03519 12.3333 1.44444 12.3333C1.8537 12.3333 2.19676 12.4718 2.47361 12.7486C2.75046 13.0255 2.88889 13.3685 2.88889 13.7778C2.88889 14.187 2.75046 14.5301 2.47361 14.8069C2.19676 15.0838 1.8537 15.2222 1.44444 15.2222Z"
								fill="#1D1B20"
							/>
						</svg>
						<p className="categoriesText">Категорії</p>
					</button>
				</Link>

				<SearchBar />

				<button className="cart">
					<svg
						className="cartSvg"
						width="26"
						height="26"
						viewBox="0 0 26 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_9_5037)">
							<path
								d="M1.08337 1.08333H5.41671L8.32004 15.5892C8.4191 16.0879 8.69044 16.536 9.08655 16.8548C9.48266 17.1737 9.9783 17.3431 10.4867 17.3333H21.0167C21.5251 17.3431 22.0208 17.1737 22.4169 16.8548C22.813 16.536 23.0843 16.0879 23.1834 15.5892L24.9167 6.5H6.50004M10.8334 22.75C10.8334 23.3483 10.3483 23.8333 9.75004 23.8333C9.15173 23.8333 8.66671 23.3483 8.66671 22.75C8.66671 22.1517 9.15173 21.6667 9.75004 21.6667C10.3483 21.6667 10.8334 22.1517 10.8334 22.75ZM22.75 22.75C22.75 23.3483 22.265 23.8333 21.6667 23.8333C21.0684 23.8333 20.5834 23.3483 20.5834 22.75C20.5834 22.1517 21.0684 21.6667 21.6667 21.6667C22.265 21.6667 22.75 22.1517 22.75 22.75Z"
								stroke="#1E1E1E"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
						<defs>
							<clipPath id="clip0_9_5037">
								<rect width="26" height="26" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<p className="cartText">Кошик</p>
				</button>

				<button className="ImageIcon">
					<img
						className="profilePhoto"
						src="https://s3-alpha-sig.figma.com/img/665e/08ea/e5eed54973ca1fe080df81cdefdeaaec?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z3PE9VK72HVrpmTjJZhG69zDnZEz~QIvDNeCNzgc5ui3u42eKFc09aoVIHyrNePBoxzDbsWQcsU4nNsBNG0P7IFugnvX7fz8PUVx0a-Yh41xGJESj3ceBp6L50pEUTSL6kA9nTbUoBWCzNVxXcnFQVwJ0J3FHFQ8kxGhC3~5IEOlnflkZJ0ArUeYsOgE1FxomFrbM23O7YaTTMwWeMzczlXntACSDOWQpMCU2TQPcI~pWjAnwkYauDN~oO-ZWKOV0F3C075bzZq~yY7goyJxM2OHcSvpOsrz4Y7Vn7zck~aZVkxZKc5jgjRwrKiYSo0fVkJuHTfXJxUgqT7cnt9rnQ__"
						alt=""
					/>
				</button>
			</header>
		</div>
	);
}

// Helo by Yarik ✍️(◔◡◔)
