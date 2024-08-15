const app = Vue.createApp({
  data() {
    return {
      seatStates: {
        sold: {
          text: "Sold",
          color: "#ff0000",
        },
        available: {
          text: "Available",
          color: "#fff",
        },
        booked: {
          text: "Booked",
          color: "gray",
        },
        selected: {
          text: "Selected",
          color: "#00ff00",
        },
      },
      seats: [
        {
          name: "A1",
          type: "available",
          price: 500,
        },
        {
          name: "A2",
          type: "available",
          price: 500,
        },
        {
          name: "A3",
          type: "available",
          price: 500,
        },
        {
          name: "A4",
          type: "available",
          price: 500,
        },
        {
          name: "B1",
          type: "available",
          price: 450,
        },
        {
          name: "B2",
          type: "available",
          price: 450,
        },
        {
          name: "B3",
          type: "available",
          price: 450,
        },
        {
          name: "B4",
          type: "available",
          price: 450,
        },
        {
          name: "C1",
          type: "available",
          price: 500,
        },
        {
          name: "C2",
          type: "available",
          price: 500,
        },
        {
          name: "C3",
          type: "available",
          price: 500,
        },
        {
          name: "C4",
          type: "available",
          price: 500,
        },
        {
          name: "D1",
          type: "available",
          price: 400,
        },
        {
          name: "D2",
          type: "available",
          price: 400,
        },
        {
          name: "D3",
          type: "available",
          price: 400,
        },
        {
          name: "D4",
          type: "available",
          price: 400,
        },
        {
          name: "E1",
          type: "available",
          price: 300,
        },
        {
          name: "E2",
          type: "available",
          price: 300,
        },
        {
          name: "E3",
          type: "available",
          price: 300,
        },
        {
          name: "E4",
          type: "available",
          price: 300,
        },
        {
          name: "F1",
          type: "available",
          price: 300,
        },
        {
          name: "F2",
          type: "available",
          price: 300,
        },
        {
          name: "F3",
          type: "available",
          price: 300,
        },
        {
          name: "F4",
          type: "available",
          price: 300,
        },
      ],
      appliedCoupon: null,
      couponCode: "",
      coupons: [
        {
          code: "100TAKAOFF",
          discount: 100,
        },
        {
          code: "200TAKAOFF",
          discount: 200,
        },
      ],
      name: "",
      mobile: "",
      confirmed: false,
    };
  },
  computed: {
    selectedSeats() {
      let ss = this.seats.filter((item) => item.type === "selected");
      return ss;
    },
    totalCost() {
      let tc = 0;
      //   this.selectedSeats.forEach((item) => {
      //     tc += item.price;
      //   });
      //use for loop
      for (let i = 0; i < this.selectedSeats.length; i++) {
        tc += this.selectedSeats[i].price;
      }
      if (this.appliedCoupon) {
        tc -= this.appliedCoupon.discount;
      }
      return tc;
    },
  },
  methods: {
    handleClick(i) {
      //   let clickedSeat = this.seats.find((item) => item.name === name);

      let clickedSeat = this.seats[i];

      if (clickedSeat.type === "sold" || clickedSeat.type === "booked") {
        alert("Can't select this seat");
        return;
      }

      if (clickedSeat.type === "available" && this.selectedSeats.length > 2) {
        alert("Can't select more than 3 seats");
        return;
      }
      clickedSeat.type =
        clickedSeat.type === "available" ? "selected" : "available";
    },
    confirm() {
      if (!this.name || !this.mobile) {
        alert("Please enter name and mobile");
        return;
      }
      this.confirmed = true;
    },

    resetData() {
      this.confirmed = false;
      this.appliedCoupon = null;
      this.couponCode = "";
      this.name = "";
      this.mobile = "";

      this.seats.forEach((seat) => {
        if (seat.type === "selected") {
          seat.type = "sold";
        }
      });
    },
  },

  watch: {
    couponCode(newValue) {
      if (newValue.length === 10) {
        const searchedCoupon = this.coupons.filter(
          (item) => item.code === newValue
        );
        console.log(searchedCoupon);

        if (searchedCoupon.length == 1) {
          this.appliedCoupon = searchedCoupon[0];
          console.log(this.appliedCoupon);
          this.couponCode = "";
        } else {
          alert("Coupon not valid");
        }
      }
    },
  },
});

app.mount("#app");
