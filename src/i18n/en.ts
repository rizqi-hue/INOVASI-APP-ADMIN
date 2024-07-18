import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      new_customers: "New Customers",
      all_customers: "See all customers",
      pending_orders: "Pending Orders",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items",
      },
      welcome: {
        title: "Welcome to the react-admin e-commerce demo",
        subtitle:
          "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        ra_button: "react-admin site",
        demo_button: "Source for this demo",
      },
    },
    menu: {
      home: "Home",
      informasi: "Informasi",
      company: "Company",
      user: "User",
      homekonten: "Home Konten",
      bisnis: "Bisnis",
      setting: "Setting",
      karir: "Karir",
    },
  },
  resources: {
    users: {
      name: "User |||| Users",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        password: "Password",
        confirm_password: "Confirm password",
        last_seen_gte: "Visited Since",
        last_seen: "Last seen",
      },
      filters: {
        name: "Name",
        email: "Email",
        phone: "Phone",
      },
      fieldGroups: {
        identity: "Identity",
        address: "Address",
        stats: "Stats",
        history: "History",
        password: "Password",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete user",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    movieinfos: {
      name: "Movie Info |||| Movie Info",
      fields: {
        server: "Movie name",
        createdAt: "Visited Since",
        updatedAt: "Last seen",
      },
      filters: {
        server: "Movie name",
      },
      page: {
        delete: "Delete movie",
      },
      tab: {
        image: "Upload image",
        detail: "Detail",
        description: "Description"
      },
    },
    genres: {
      name: "Genre |||| Genres",
      fields: {
        genre: "Genre name",
        createdAt: "Visited Since",
        updatedAt: "Last seen",
      },
      filters: {
        server: "Genre name",
      },
      page: {
        delete: "Delete genre",
      },
    },
    servers: {
      name: "Server |||| Servers",
      fields: {
        server: "Server name",
        createdAt: "Visited Since",
        updatedAt: "Last seen",
      },
      filters: {
        server: "Server name",
      },
      page: {
        delete: "Delete server",
      },
    },
    languages: {
      name: "Language |||| Languages",
      fields: {
        server: "Language name",
        createdAt: "Visited Since",
        updatedAt: "Last seen",
      },
      filters: {
        server: "Language name",
      },
      page: {
        delete: "Delete language",
      },
    },
    qualities: {
      name: "Quality |||| Qualities",
      fields: {
        server: "Quality name",
        createdAt: "Visited Since",
        updatedAt: "Last seen",
      },
      filters: {
        server: "Quality name",
      },
      page: {
        delete: "Delete quality",
      },
    },
    blogs: {
      filters: {
        status: "STATUS",
        publish: "PUBLISH",
        draft: "DRAFT",
      },
    },
    commands: {
      name: "Order |||| Orders",
      amount: "1 order |||| %{smart_count} orders",
      title: "Order %{reference}",
      fields: {
        basket: {
          delivery: "Delivery",
          reference: "Reference",
          quantity: "Quantity",
          sum: "Sum",
          tax_rate: "Tax Rate",
          taxes: "Tax",
          total: "Total",
          unit_price: "Unit Price",
        },
        address: "Address",
        customer_id: "Customer",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        nb_items: "Nb Items",
        total_gte: "Min amount",
        status: "Status",
        returned: "Returned",
      },
      section: {
        order: "Order",
        customer: "Customer",
        shipping_address: "Shipping Address",
        items: "Items",
        total: "Totals",
      },
    },
    invoices: {
      name: "Invoice |||| Invoices",
      fields: {
        date: "Invoice date",
        customer_id: "Customer",
        command_id: "Order",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        total_gte: "Min amount",
        address: "Address",
      },
    },
    products: {
      name: "Poster |||| Posters",
      fields: {
        category_id: "Category",
        height_gte: "Min height",
        height_lte: "Max height",
        height: "Height",
        image: "Image",
        price: "Price",
        reference: "Reference",
        sales: "Sales",
        stock_lte: "Low Stock",
        stock: "Stock",
        thumbnail: "Thumbnail",
        width_gte: "Min width",
        width_lte: "Max width",
        width: "Width",
      },
      tabs: {
        image: "Image",
        details: "Details",
        description: "Description",
        reviews: "Reviews",
      },
      filters: {
        categories: "Categories",
        stock: "Stock",
        no_stock: "Out of stock",
        low_stock: "1 - 9 items",
        average_stock: "10 - 49 items",
        enough_stock: "50 items & more",
        sales: "Sales",
        best_sellers: "Best sellers",
        average_sellers: "Average",
        low_sellers: "Low",
        never_sold: "Never sold",
      },
    },
    inventori: {
      tabs: {
        image: "Image",
        details: "Details",
        peminjaman: "Peminjaman",
      },
    },
    jadwal: {
      tabs: {
        cek_jadwal: "Cek Jadwal",
        details: "Detail",
      },
    },
    peminjaman: {
      tabs: {
        datadiri: "Data Diri",
        pilihbarang: "Pilih Barang",
        pilihruangan: "Pilih Ruangan",
      },
    },
    categories: {
      name: "Category |||| Categories",
      fields: {
        products: "Products",
      },
    },
    reviews: {
      name: "Review |||| Reviews",
      amount: "1 review |||| %{smart_count} reviews",
      relative_to_poster: "Review on poster",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected",
      },
    },
    segments: {
      name: "Segment |||| Segments",
      fields: {
        customers: "Customers",
        name: "Name",
      },
      data: {
        compulsive: "Compulsive",
        collector: "Collector",
        ordered_once: "Ordered once",
        regular: "Regular",
        returns: "Returns",
        reviewer: "Reviewer",
      },
    },
  },
};

export default customEnglishMessages;
