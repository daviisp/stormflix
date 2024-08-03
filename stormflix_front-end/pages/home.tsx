import Footer from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spinner";
import FavoriteCategory from "@/src/components/HomeAuth/favoriteCategory";
import FeaturedCategory from "@/src/components/HomeAuth/featuredsCategory";
import FeaturedSection from "@/src/components/HomeAuth/featuredSection";
import ListCategories from "@/src/components/HomeAuth/listCategories";
import NewestCategory from "@/src/components/HomeAuth/newestCategory";
import profileService from "@/src/services/profileService";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeAuth = () => {
  const router = useRouter();
  const [id, setId] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("stormflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    const res = await profileService.fetchCurrent();
    setId(res.id);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchLastEpisode = async () => {
    const res = await profileService.lastEpisodeWatched();
    console.log(res);
  };

  useEffect(() => {
    fetchLastEpisode();
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>StormFlix - Home</title>
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <FavoriteCategory />
        </div>
        <FeaturedCategory />
        <ListCategories />
        <Footer />
      </main>
    </>
  );
};
export default HomeAuth;
