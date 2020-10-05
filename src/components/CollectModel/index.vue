<template>
  <el-dialog
    title="添加收藏夹"
    :visible.sync="isShowCollectModel"
    class="add-collect-dialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    width="400px"
    center
    :close-on-press-escape="false">
    <div class="add-collect-dialog-wrapper">
      <div class="favorites-list">
        <el-table
          ref="favoritesListTable"
          :data="favoritesList"
          highlight-current-row
          :show-header="false"
          @current-change="selectFavorite"
          :row-style="rowStyle"
          @row-click="rowClick"
          style="width: 100%;">
          <el-table-column width="20px"></el-table-column>
          <el-table-column property="name"></el-table-column>
          <el-table-column align="center" width="70px">
            <template #default="scope">
              <div v-show="isSelectFavorite[scope.$index]" style="width: 25px;height: 21px;">
                <img src="@/assets/images/favorite-select.png" width="24" height="24">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddFavorite = false" plain>取 消</el-button>
        <el-button type="danger" @click="addFavoriteHandler">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "collectModel",
    props: {
      isShowCollectModel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isSelectFavorite: [],
        currentRow: '',
        favoritesList: [
          {
            name: '555'
          },
          {
            name: 'av资源'
          }
        ]
      }
    },
    computed: {},
    methods: {
      selectFavorite(row) {
        console.log(row);
        this.$refs.favoritesListTable.setCurrentRow(row);
      },
      rowStyle(data) {
        if (data.row.name === this.currentRow) {
          this.isSelectFavorite[data.rowIndex] = true
        }else {
          this.isSelectFavorite[data.rowIndex] = false
        }
        return {cursor: 'pointer'}
      },
      rowClick(row, column, event) {
        this.currentRow = row.name
      },
      addFavoriteHandler() {
        this.$emit('addFavoriteHandler')
      }
    },
    created() {
      for (let i = 0; i < this.favoritesList.length; i++) {
        this.isSelectFavorite.push(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  //创建收藏夹div
  .add-collect-dialog {
    margin-top: 50px;
    .add-collect-dialog-wrapper {
      margin-top: -30px;
      .favorites-list {
      }
    }
    .dialog-footer {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
