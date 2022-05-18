<template>
    <footer class="footer has-cards">   
        <div class="container">
            <div class="row row-grid align-items-center my-md">
                <div class="col-lg-6">
                    <h3 class="text-primary font-weight-light mb-2">Thank you for choosing us!</h3>
                    <h4 class="mb-0 font-weight-light">We appreciate your interest!</h4>
                </div>
            </div>
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-6">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="https://t.me/ne_cutya" target="_blank" rel="noopener">CheckIT</a>
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link nav-link-icon" href="/"
                            target="_blank" rel="noopener" data-toggle="tooltip" title="Star us on Github">
                                <i class="fa fa-github"></i>
                                <span class="nav-link-inner--text d-lg-none">Github</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/#pricing" rel="noopener">Pricing</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/#features" rel="noopener">About Us</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/#FAQ" rel="noopener">FAQ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/#contact" rel="noopener">Contact</router-link>
                        </li>
                        <li class="nav-item">
                            <a href="/" class="nav-link" target="_blank" rel="noopener">Privacy policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
