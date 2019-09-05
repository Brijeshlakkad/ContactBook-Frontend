<template>
    <nav class="navbar navbar-light bg-light">
          <button class="btn btn-primary" @click="$parent.createDefaultContact()">
            <span>Add Contact</span>
          </button>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <form class="form-inline" action="/action_page.php">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">@</span>
                  </div>
                  <input type="text" class="form-control" placeholder="Search Contact" />
                </div>
              </form>
            </li>
          </ul>
        </nav>
</template>
<script>
export default {
    
}
</script>