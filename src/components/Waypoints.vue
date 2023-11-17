<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Add Waypoints Form</h5>
        <form @submit.prevent="submitForm">
          <!-- Add at least 10 input fields as needed -->
          <div class="form-group">
            <label for="height">Height:</label>
            <input
              type="text"
              id="height"
              v-model="formData.height"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="height">Speed:</label>
            <input
              type="text"
              id="speed"
              v-model="formData.speed"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="height">Battery:</label>
            <input
              type="text"
              id="battery"
              v-model="formData.battery"
              class="form-control"
              required
            />
          </div>
          <!-- Repeat similar code for other input fields -->

          <button
            type="submit"
            class="btn btn-primary"
            style="margin-top: 10px"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        height: "",
        speed: "",
        battery: "",

        // Add other form fields here
      },
    };
  },
  methods: {
    submitForm() {
      // Use Axios to post the formData to the server
      // For example:
      // axios.post('http://127.0.0.1:8000/api/waypoints', this.formData)
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
    },
  },
};
</script>
