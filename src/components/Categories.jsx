import {
  AcUnit,
  Balcony,
  BeachAccessOutlined,
  BrandingWatermarkOutlined,
  Camera,
  Campaign,
  CarCrashOutlined,
  Castle,
  ContactSupport,
  CookieRounded,
  Diamond,
  Dining,
  DirectionsBoatFilledSharp,
  DownhillSkiing,
  DryRounded,
  EventRepeatOutlined,
  FireExtinguisher,
  FlashAutoSharp,
  ForestOutlined,
  FreeBreakfastOutlined,
  Gradient,
  HearingRounded,
  HeatPump,
  Hiking,
  IosShareOutlined,
  Iron,
  Key,
  Microwave,
  OutdoorGrill,
  PeopleAltSharp,
  Pets,
  PivotTableChart,
  Pool,
  Room,
  Shower,
  SnowboardingOutlined,
  Soap,
  ThermostatRounded,
  Tv,
  VillaOutlined,
  WashRounded,
  Wifi,
  WindowOutlined,
  WorkspacePremium,
} from "@mui/icons-material";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";
import { BiFirstAid, BiWorld } from "react-icons/bi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/beach_cat.jpg",
    label: "Beachfront",
    icon: <BeachAccessOutlined />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/windmill_cat.webp",
    label: "Windmills",
    icon: <WindowOutlined />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/modern_cat.webp",
    label: "Iconic cities",
    icon: <VillaOutlined />,
    description: "This property is modern!",
  },
  {
    img: "assets/countryside_cat.webp",
    label: "Countryside",
    icon: <Hiking />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Amazing Pools",
    icon: <Pool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Islands",
    icon: <IosShareOutlined />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Lakefront",
    icon: <DirectionsBoatFilledSharp />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Ski-in/out",
    icon: <DownhillSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Castles",
    icon: <Castle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: <EventRepeatOutlined />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Camping",
    icon: <ForestOutlined />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Arctic",
    icon: <SnowboardingOutlined />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Desert",
    icon: <ContactSupport />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Barns",
    icon: <BrandingWatermarkOutlined />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Luxury",
    icon: <Diamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FlashAutoSharp />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <Room />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <PeopleAltSharp />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PivotTableChart />,
  },
  {
    name: "Personal care products",
    icon: <Soap />,
  },
  {
    name: "Outdoor shower",
    icon: <Shower />,
  },
  {
    name: "Washer",
    icon: <WashRounded />,
  },
  {
    name: "Dryer",
    icon: <DryRounded />,
  },
  {
    name: "Hangers",
    icon: <HearingRounded />,
  },
  {
    name: "Iron",
    icon: <Iron />,
  },
  {
    name: "TV",
    icon: <Tv />,
  },
  {
    name: "Dedicated workspace",
    icon: <WorkspacePremium />,
  },
  {
    name: "Air Conditioning",
    icon: <AcUnit />,
  },
  {
    name: "Heating",
    icon: <HeatPump />,
  },
  {
    name: "Security cameras",
    icon: <Camera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiFirstAid />,
  },
  {
    name: "Wifi",
    icon: <Wifi />,
  },
  {
    name: "Cooking set",
    icon: <CookieRounded />,
  },
  {
    name: "Refrigerator",
    icon: <FreeBreakfastOutlined />,
  },
  {
    name: "Microwave",
    icon: <Microwave />,
  },
  {
    name: "Stove",
    icon: <ThermostatRounded />,
  },
  {
    name: "Barbecue grill",
    icon: <OutdoorGrill />,
  },
  {
    name: "Outdoor dining area",
    icon: <Dining />,
  },
  {
    name: "Private patio or Balcony",
    icon: <Balcony />,
  },
  {
    name: "Camp fire",
    icon: <Campaign />,
  },
  {
    name: "Garden",
    icon: <Gradient />,
  },
  {
    name: "Free parking",
    icon: <CarCrashOutlined />,
  },
  {
    name: "Self check-in",
    icon: <Key />,
  },
  {
    name: " Pet allowed",
    icon: <Pets />,
  },
];

const Categories = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="categories">
      <motion.h1
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "circInOut" }}
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        Explore Top Categories
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 1 }}
      >
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </motion.p>

      <div className="categories_list">
        {categories?.slice(1, 10).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
