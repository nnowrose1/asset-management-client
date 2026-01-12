const Statistics = () => {
  return (
    <section className=" py-16 text-center max-w-5xl mx-auto rounded-md">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-4">Our Impact in Numbers</h2>
      <p className="text-accent text-center max-w-2xl mx-auto mb-16">
  We’re proud of the difference we’ve made. These numbers reflect the trust, success, and satisfaction of our growing community of users and partners.
</p>

      <div className="flex flex-col md:flex-row justify-around items-center gap-12">
        <div>
          <p className="text-5xl font-extrabold text-primary">10K+</p>
          <p className="mt-2 text-lg">Happy Users</p>
        </div>
        <div>
          <p className="text-5xl font-extrabold text-primary">500+</p>
          <p className="mt-2 text-lg">Projects Completed</p>
        </div>
        <div>
          <p className="text-5xl font-extrabold text-primary">99%</p>
          <p className="mt-2 text-lg">Customer Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
