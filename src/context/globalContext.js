import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "./AuthContext";
import { get, post } from "@/lib/network/http";
import { useSession } from "next-auth/react";
import { ReadonlyURLSearchParams, useParams, usePathname, useRouter, useSearchParams, useSelectedLayoutSegments, } from "next/navigation";
import { generateUrlFromNestedObject, parseUrlWithQueryParams } from "@/helper/function";
var Url = require('url-parse');
const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const { user, userId } = useAuthContext();
  const [state, setState] = useState(false);
  const [wishlistData, setWishlistData] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(24);
  const [price, setPrice] = useState(undefined);
  const [Rating, setRating] = useState(0);
  const [sort, setSort] = useState("relevance-desc");
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState(undefined);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); const params = useParams()

  const [filters, setFilters] = useState({
    categories: [],
    brandName: [],
    tags: [],
    rating: [],
    salePrice: [0, 999],
    isAvailable: [],
    discount: []
    // Add more filter types if needed
  });

  const fetchCategories = async (second) => {
    const response = await get("/public/categories");
    setCategories(response);
  };

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
  }, [categories]);


  const searchProducts = async (second) => {

    var sortItem = sort.split('-');
    let mysort = `${sortItem[0]}:${sortItem[1]}`
    // const [sortKey, sortOrder] = sort.split("-");
    // myObject[sortKey] = sortOrder

    // console.log(mysort);

    const query = {
      filter: {
        ...filters, search: searchData
      },
      page: page + 1,
      limit: limit,
      sort: mysort,
    };

    const checkQuerydata = generateUrlFromNestedObject({ ...query, filter: query.filter });
    // const success = router.push(`${pathname}${checkQuerydata}`)

    router.replace(`${pathname}${checkQuerydata}`)

    // var currentURL = window.location.href;
    // var url = new Url(currentURL);
    // console.log(url.query);
    // const parsedObject = parseUrlWithQueryParams(`${url.query}`);
    // console.log(query.filter);
    // const res = await get("/public/product/search", {...query,filter:JSON.stringify(query.filter)});
    // setProducts(res)

  };

  const getWishlist = async (second) => {
    const res = await get('/wishlists/fetch')
    setWishlistData(res)
    console.log(res);
  }
  useEffect(() => {
    if (session) {
      getWishlist()
    }
  }, [session]);


  // function navigateToPath(fullPath) {

  //   return new Promise((resolve, reject) => {

  //     setTimeout(() => {
  //       // Assuming router.push returns a promise or you can use an async function
  //       router.push(fullPath)
  //         .then(() => {
  //           resolve(true);
  //         })
  //         .catch((error) => {
  //           // Handle any errors during navigation
  //           reject(error);
  //         });
  //     }, 1000); // Simulating an asynchronous operation (e.g., API call)
  //   });
  // }


  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        openModal,
        setOpenModal,
        searchData,
        setSearchData,
        category,
        setCategory,
        page,
        setPage,
        searchProducts, filters, setFilters,
        limit,
        setLimit, products, setSort, sort, brand, setBrand, price, setPrice, categories, getWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

